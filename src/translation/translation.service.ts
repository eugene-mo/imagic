import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OpenAI from 'openai';
import { Translation } from './entities/translation.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TranslationService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    private configService: ConfigService
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_KEY'),
    });
  }

  // Проверяем, есть ли перевод в базе данных
  async translateText(text: string): Promise<{ language: string; translation: string }> {
    const existingTranslation = await this.translationRepository.findOne({
      where: { originalText: text },
    });

    // Если перевод уже есть, возвращаем его
    if (existingTranslation) {
      return {
        language: existingTranslation.language,
        translation: existingTranslation.translatedText,
      };
    }

    // Если перевода нет, делаем запрос в OpenAI
    try {
      const prompt = `Определи язык этого текста: '${text}' и переведи его на английский. Укажи код языка в формате ISO 639-1, затем переведенный текст.`;

      const response = await this.openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.3,
      });

      const responseText = response.choices[0].text.trim().toLowerCase();
      const [language, ...translationArr] = responseText.split('\n');
      const translation = translationArr.join(' ').trim();

      // Сохраняем перевод в базе данных
      const newTranslation = this.translationRepository.create({
        originalText: text,
        language: language.replace('language:', '').trim(),
        translatedText: translation,
      });
      await this.translationRepository.save(newTranslation);

      return {
        language: newTranslation.language,
        translation: newTranslation.translatedText,
      };
    } catch (error) {
      if (error.status === 429) {
        throw new HttpException(
          'ChatGPT translation quota exceeded. Please check your usage and try again later.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new HttpException(
          'ChatGPT translation error occurred while processing your request.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
