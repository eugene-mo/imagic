import { Quest } from "src/quest/entities/quest.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SourceService {
    @PrimaryGeneratedColumn({ name: 'source_service_id' })
    id: number

    @OneToMany(() => Quest, (quest) => quest.sourceService)
    quests: Quest[]
}
