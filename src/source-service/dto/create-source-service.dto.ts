import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Captcha } from "src/captcha/entities/captcha.entity";
import { Quest } from "src/quest/entities/quest.entity";

export class CreateSourceServiceDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string

    @IsOptional()
    quests?: Quest[] | null = null

    @IsOptional()
    captchas?: Captcha[] | null = null
}
