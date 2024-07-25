import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateSourceServiceDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string
}
