import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { CaptchaProvider } from "src/captcha-provider/entities/captcha-provider.entity";
import { SourceService } from "src/source-service/entities/source-service.entity";
import { Task } from "src/task/entities/task.entity";

export class CreateCaptchaDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    @MinLength(3)
    name: string

    @IsNumber()
    imageLimit: number

    @IsOptional()
    @IsNumber()
    imageNum?: number

    @IsOptional()
    provider?: string | null

    @IsOptional()
    sourceServices?: SourceService[] | null = null

    @IsOptional()
    tasks?: Task[] | Task | null = null
}
