import { Captcha } from "src/captcha/entities/captcha.entity";
import { Job } from "src/job/entities/job.entity";
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
    text: string

    @ManyToMany(() => Captcha, (captcha) => captcha.taskTypes)
    captchas: Captcha[]

    @OneToMany(() => Job, (job) => job.taskType)
    jobs: Job[]

    //think how to implement the child and parent behavior to be able to group types (like group task types 'find horse', 'find monkey' to 'find animal' etc) 
    // @ManyToMany(()=>TaskType,(taskType)=>)
    // parentTypes: TaskType[] || childTypes: TaskType[]
}
