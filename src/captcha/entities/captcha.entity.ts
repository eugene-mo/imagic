import { CaptchaProvider } from "src/captcha-provider/entities/captcha-provider.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { SourceService } from "src/source-service/entities/source-service.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Captcha {
    @PrimaryGeneratedColumn({ name: 'captcha_id' })
    id: number;

    @Column()
    name: string;

    // Maximum number of images that can be stored on server
    @Column({ type: 'int', nullable: false })
    imageLimit: number;

    // How many images of captcha type currently stored on server
    @Column({ type: 'int', default: 0 })
    imageNum: number;

    @OneToMany(() => Quest, (quest) => quest.captcha)
    quests?: Quest[];

    @ManyToMany(() => Task, (task) => task.captchas)
    @JoinTable({
        name: 'captcha_tasks',
        joinColumn: { name: 'captcha_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'task_id', referencedColumnName: 'id' },
    })
    tasks?: Task[];

    @ManyToMany(() => SourceService, (sourceService) => sourceService.captchas)
    @JoinTable({
        name: 'captcha_source_services',
        joinColumn: { name: 'captcha_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'source_service_id', referencedColumnName: 'id' },
    })
    sourceServices?: SourceService[];

    @ManyToOne(() => CaptchaProvider, (captchaProvider) => captchaProvider.captchas, { nullable: true })
    @JoinColumn({ name: 'provider_id' })
    provider?: CaptchaProvider | null;
}
