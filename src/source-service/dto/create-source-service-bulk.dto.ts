import { IsArray, IsNotEmpty } from "class-validator";

export class CreateSourceServiceBulkDto {
    @IsArray()
    @IsNotEmpty()
    names: string[]
}
