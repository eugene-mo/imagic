import { Captcha } from "src/captcha/entities/captcha.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class TaskType {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Task, (task) => task.type)
    tasks: Task[];

    //example: find horse, find flower
    @Column()
    description: string

    @ManyToMany(() => Captcha, (captcha) => captcha.taskTypes)
    captchas: Captcha[]
}
