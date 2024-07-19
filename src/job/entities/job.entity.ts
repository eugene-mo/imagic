import { Quest } from "src/quest/entities/quest.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn({ name: 'job_id' })
    id: number

    @ManyToOne(() => Quest, (quest) => quest.jobs)
    quest: Quest
}
