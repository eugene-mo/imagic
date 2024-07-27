import { IsOptional, IsString, MinLength } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

const TASK_IMG_MAX_SIZE_BYTES = 1 * 1024 * 1024
export class CreateTaskDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    taskText?: string

    @IsOptional()
    @IsFile()
    @MaxFileSize(TASK_IMG_MAX_SIZE_BYTES)
    @HasMimeType(['image/jpeg', 'image/png'])
    taskImage?: FileSystemStoredFile
}
