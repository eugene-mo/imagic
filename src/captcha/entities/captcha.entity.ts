import { CaptchaProvider } from "src/captcha-provider/entities/captcha-provider.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { SourceService } from "src/source-service/entities/source-service.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Captcha {
    @PrimaryGeneratedColumn({ name: 'captcha_id' })
    id: number

    @Column()
    name: string

    // maximum number of images that can be stored on server
    @Column()
    imageLimit: number

    // how many images of captcha type currently stored on server
    @Column()
    imageNum: number = 0

    @OneToMany(() => Quest, (quest) => quest.captcha)
    quests: Quest[]

    @ManyToMany(() => Task, (task) => task.captchas)
    @JoinTable({
        name: 'captcha_tasks',
        joinColumn: { name: 'captcha_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'task_id', referencedColumnName: 'id' },
    })
    tasks: Task[]

    @ManyToMany(() => SourceService, (sourceService) => sourceService.captchas)
    @JoinTable({
        name: 'captcha_source_services',
        joinColumn: { name: 'captcha_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'source_service_id', referencedColumnName: 'id' },
    })
    sourceServices: SourceService[]

    @ManyToOne(() => CaptchaProvider, (captchaProvider) => captchaProvider.captchas)
    @JoinColumn({ name: 'provider_id' })
    provider: CaptchaProvider | Boolean | null

    //example of captcha images stored in ../static/captcha-image/__captcha_id.jpg

}
