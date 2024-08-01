import { Captcha } from "src/captcha/entities/captcha.entity";
import { Job } from "src/job/entities/job.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//example: image text / text / image | (image text* not ready yet - task type is text, but he provided as an image on service side)
//if task has image ('image text' & 'image types') - image will be located by address ../static/task-image/__quest_id.jpeg
@Entity()
export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    id: number;

    @OneToMany(() => Quest, (quest) => quest.task)
    quests: Quest[];

    @Column()
    type: string;

    @Column({ nullable: true })
    text?: string;

    @ManyToMany(() => Captcha, (captcha) => captcha.tasks)
    captchas?: Captcha[];

    @OneToMany(() => Job, (job) => job.task)
    jobs?: Job[];
}

    
