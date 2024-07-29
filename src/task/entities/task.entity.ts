import { Captcha } from "src/captcha/entities/captcha.entity";
import { Job } from "src/job/entities/job.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    id: number

    @OneToMany(() => Quest, (quest) => quest.task)
    @JoinColumn({ name: 'quest_id' })
    quests: Quest[]

    //example: image text / text / image | (image text* not ready yet - task type is text, but he provided as an image on service side)
    //if task has image ('image text' & 'image types') - image will be located by address ../static/task-image/__quest_id.jpeg
    @Column()
    type: string

    @Column()
    text?: string

    @ManyToMany(() => Captcha, (captcha) => captcha.tasks)
    captchas: Captcha[]

    @OneToMany(() => Job, (job) => job.task)
    @JoinColumn({ name: 'job_ids' })
    jobs: Job[]
}
