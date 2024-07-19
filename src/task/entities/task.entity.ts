import { Quest } from "src/quest/entities/quest.entity";
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    id: number

    @OneToOne(() => Quest, (quest) => quest.task)
    quests: Quest
}
