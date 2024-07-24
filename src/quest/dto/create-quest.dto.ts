import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

const QUEST_IMG_MAX_SIZE_BYTES = 3 * 1024 * 1024;
const TASK_IMG_MAX_SIZE_BYTES = 1 * 1024 * 1024;

export class CreateQuestDto {
  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsString()
  captcha: string;

  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(QUEST_IMG_MAX_SIZE_BYTES)
  @HasMimeType(['image/jpeg', 'image/png'])
  questImage: FileSystemStoredFile;

  @IsOptional()
  @IsFile()
  @MaxFileSize(TASK_IMG_MAX_SIZE_BYTES)
  @HasMimeType(['image/jpeg', 'image/png'])
  taskImage?: FileSystemStoredFile;

  @IsOptional()
  @IsString()
  taskText?: string;
}
