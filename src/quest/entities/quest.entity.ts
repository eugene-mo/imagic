import { Captcha } from "src/captcha/entities/captcha.entity";
import { SourceService } from "src/source-service/entities/source-service.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestStatus } from "../quest-status/entities/quest-status.entity";
import { ProductionLine } from "src/production-line/entities/production-line.entity";
import { Job } from "src/job/entities/job.entity";

@Entity()
export class Quest {
    @PrimaryGeneratedColumn({ name: 'quest_id' })
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    producedAt: Date | null = null;

    @Column({ type: 'timestamptz', nullable: true })
    solvedAt: Date | null = null;

    @ManyToOne(() => Task, (task) => task.quests, { nullable: false })
    @JoinColumn({ name: 'task_id' })
    task: Task;

    @ManyToOne(() => Captcha, (captcha) => captcha.quests, { nullable: false })
    @JoinColumn({ name: 'captcha_id' })
    captcha: Captcha;

    @ManyToOne(() => SourceService, (sourceService) => sourceService.quests, { nullable: false })
    @JoinColumn({ name: 'service_id' })
    sourceService: SourceService;

    @ManyToOne(() => QuestStatus, (questStatus) => questStatus.quests, { nullable: true })
    @JoinColumn({ name: 'quest_status_id' })
    status: QuestStatus;

    @ManyToOne(() => ProductionLine, (productionLine) => productionLine.quests, { nullable: true })
    @JoinColumn({ name: 'production_line_id' })
    productionLine?: ProductionLine;

    @OneToMany(() => Job, (job) => job.quest)
    jobs?: Job[];
}
