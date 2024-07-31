import { IsOptional, IsString, MinLength } from "class-validator"
import { Captcha } from "src/captcha/entities/captcha.entity"

export class CreateCaptchaProviderDto {
    @IsOptional()
    id?: number

    @IsString()
    @MinLength(4)
    name: string

    @IsOptional()
    captchas?: Captcha | Captcha[] | null = null
}
