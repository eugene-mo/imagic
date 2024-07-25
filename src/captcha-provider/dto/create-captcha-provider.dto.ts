import { IsString, MinLength } from "class-validator"

export class CreateCaptchaProviderDto  {
    @IsString()
    @MinLength(4)
    name: string
}
