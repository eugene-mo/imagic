import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCaptchaDto {
    @IsString()
    @MinLength(3)
    name: string

    @IsNumber()
    imageLimit: number

    @IsString()
    captchaProvider?: string | null

    @IsOptional()
    sourceServices?: string[] | null
}
