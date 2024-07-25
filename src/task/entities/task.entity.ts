import { Captcha } from "src/captcha/entities/captcha.entity";
import { Job } from "src/job/entities/job.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    id: number

    @OneToOne(() => Quest, (quest) => quest.task)
    @JoinColumn({ name: 'quest_id' })
    quest: Quest

    //example - unique text task / unique image task 
    //if task has image task description - image will be located by address ../static/task-image/__quest_id.jpeg
    @Column()
    type: string

    @ManyToMany(() => Captcha, (captcha) => captcha.tasks)
    captchas: Captcha[]

    @OneToMany(() => Job, (job) => job.task)
    @JoinColumn({ name: 'job_ids' })
    jobs: Job[]
}
