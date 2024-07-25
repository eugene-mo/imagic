import { Captcha } from "src/captcha/entities/captcha.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SourceService {
    @PrimaryGeneratedColumn({ name: 'source_service_id' })
    id: number

    @Column()
    name:string

    @OneToMany(() => Quest, (quest) => quest.sourceService)
    quests: Quest[]

    @ManyToMany(() => Captcha, (captcha) => captcha.sourceServices)
    @JoinColumn({ name: 'captcha_ids' })
    captchas: Captcha[]
}
