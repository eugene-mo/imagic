import { Quest } from "src/quest/entities/quest.entity";
import { TaskType } from "src/task-type/entities/task-type.entity";
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Captcha {
    @PrimaryGeneratedColumn({ name: 'captcha_id' })
    id: number

    @OneToMany(() => Quest, (quest) => quest.captcha)
    quests: Quest[]

    @ManyToMany(() => TaskType, (taskType) => taskType.captchas)
    taskTypes: TaskType[]
}
