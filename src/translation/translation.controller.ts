import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { Translation } from './entities/translation.entity';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) { }

  @Post()
  async translate(@Body('text') text: string) {
    const result = await this.translationService.translateText(text);
    return result;
  }

  // Получение перевода по ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const translation = await this.translationService.findOne(+id);
    return translation;
  }

  // Удаление перевода по ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.translationService.remove(+id);
    return { message: 'Translation has been removed' };
  }

  // Удаление всех переводов
  @Delete()
  async removeAll() {
    await this.translationService.removeAllTranslations();
    return { message: 'All translations have been removed' };
  }

  // Обновление перевода по ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTranslationDto: Partial<Translation>) {
    const updatedTranslation = await this.translationService.update(+id, updateTranslationDto);
    return updatedTranslation;
  }

  // Поиск перевода по полям (например, по оригинальному тексту или языку)
  @Post('search')
  async search(@Body() searchFields: Partial<Translation>) {
    const translation = await this.translationService.findByFields(searchFields);
    if (!translation) {
      throw new HttpException('Translation not found', HttpStatus.NOT_FOUND);
    }
    return translation;
  }
}
