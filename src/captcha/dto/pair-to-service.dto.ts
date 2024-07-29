import { IsString } from "class-validator";

export class pairCaptchaToServiceDto {
    @IsString()
    captchaName: string

    @IsString()
    serviceName: string
}
