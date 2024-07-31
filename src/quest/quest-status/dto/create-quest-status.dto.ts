import { IsOptional, IsString } from "class-validator"
import { Quest } from "src/quest/entities/quest.entity"

export class CreateQuestStatusDto {
    @IsOptional()
    id?: number

    @IsString()
    title: string

    @IsString()
    @IsOptional()
    description?: string | null

    @IsOptional()
    quests?: Quest[] | null
}
