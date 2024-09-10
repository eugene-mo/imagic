import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OpenAI from 'openai';
import { Translation } from './entities/translation.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TranslationService {
  private openai: OpenAI;
  private openai_api_key = this.configService.get<string>('OPENAI_KEY');

  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    private configService: ConfigService
  ) {
    this.openai = new OpenAI({
      apiKey: this.openai_api_key,
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

    // Если перевода нет, делаем запрос в openai
    try {
      console.log('Send API request with key: ', this.openai_api_key);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "system", "content": "You translation assist. Detect the lang of text and translate it to En. The output should be in the format: ISO 3166-1 alpha-2 language code | translated text." }, { role: 'user', content: `${text}` }],
        max_tokens: 150,
        temperature: 0.3,
      });

      console.log('OpenAI full response: ', response);
      console.log('OpenAI message: ', response.choices[0].message);

      const responseText = response.choices[0].message.content.trim().toLowerCase();
      const [languagePart, translationPart] = responseText.split('|');

      const language = languagePart.trim().slice(0, 2);  // Оставляем только 2 символа для ISO-кода
      const translation = translationPart.trim();

      // Сохраняем перевод в базе данных
      const newTranslation = this.translationRepository.create({
        originalText: text.trim().toLowerCase(),
        language: language,
        translatedText: translation,
      });
      await this.translationRepository.save(newTranslation);

      return {
        language: newTranslation.language,
        translation: newTranslation.translatedText,
      };
    } catch (error) {
      console.log('OPENAI Response error: ', error);
      if (error.status === 429) {
        throw new HttpException(
          'ChatGPT translation quota exceeded. Please check your BALANCE and try again later.',
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

  async findOne(id: number): Promise<Translation> {
    const translation = await this.translationRepository.findOne({ where: { id } });
    if (!translation) {
      throw new HttpException('Translation not found', HttpStatus.NOT_FOUND);
    }
    return translation;
  }

  async remove(id: number): Promise<void> {
    const translation = await this.findOne(id);
    await this.translationRepository.remove(translation);
  }

  async removeAllTranslations(): Promise<void> {
    await this.translationRepository.clear();
  }

  async update(id: number, updateTranslationDto: Partial<Translation>): Promise<Translation> {
    const translation = await this.findOne(id);
    const updatedTranslation = Object.assign(translation, updateTranslationDto);
    return await this.translationRepository.save(updatedTranslation);
  }

  async findByFields(fields: Partial<Translation>): Promise<Translation | undefined> {
    const translation = await this.translationRepository.findOne({ where: fields });
    return translation;
  }
}
