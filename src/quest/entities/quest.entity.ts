import { Captcha } from "src/captcha/entities/captcha.entity";
import { SourceService } from "src/source-service/entities/source-service.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestStatus } from "./quest-status.entity";
import { ProductionLine } from "src/production-line/entities/production-line.entity";
import { Job } from "src/job/entities/job.entity";

//link to original quest image -> static/original-images/__quest_id__.jpg
@Entity()
export class Quest {
    @PrimaryGeneratedColumn({ name: 'quest_id' })
    id: number

    //date when quest-image with task description was added to database (user sent quest-image screen)
    @CreateDateColumn()
    createdAt: Date

    //date when quest-image was prepared for classification (image was produced through production line) 
    @Column({ type: 'timestamptz' })
    producedAt: Date | null = null

    //date when quest-image was fully solved and solution was added to database (object(s) on image was classified)
    @Column({ type: 'timestamptz' })
    solvedAt: Date | null = null

    //link to Task entity where stored the description of quest (it can be text description or another image with task) | Every quest have 1 task description
    @ManyToOne(() => Task, (task) => task.quests)
    @JoinColumn({ name: 'task_id' })
    task: Task

    //link to Captcha entity where stored the description of captcha type of image that  we recognizing in quest
    @ManyToOne(() => Captcha, (captcha) => captcha.quests)
    @JoinColumn({ name: 'captcha_id' })
    captcha: Captcha

    //link to Service where stored info about quest source
    @ManyToOne(() => SourceService, (sourceService) => sourceService.quests)
    @JoinColumn({ name: 'service_id' })
    sourceService: SourceService

    //link to quest status where described each quest status
    @ManyToOne(() => QuestStatus, (questStatus) => questStatus.quests)
    @JoinColumn({ name: 'quest_status_id' })
    status: QuestStatus

    //link to Production line id - group of image production methods that describing how original image producing to prepare it to work
    @ManyToOne(() => ProductionLine, (productionLine) => productionLine.quests)
    @JoinColumn({ name: 'production_line_id' })
    productionLine?: ProductionLine

    //link to array of jobs that was created when original image was produced (jobs for classification)
    @OneToMany(() => Job, (job) => job.quest)
    @JoinColumn({ name: 'job_ids' })
    jobs?: Job[] | null = null
}