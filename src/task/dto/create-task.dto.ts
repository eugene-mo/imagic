import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    taskText?: string

    @IsOptional()
    @IsBoolean()
    taskImage?: Boolean
}
