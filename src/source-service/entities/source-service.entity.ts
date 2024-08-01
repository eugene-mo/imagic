import { Captcha } from "src/captcha/entities/captcha.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class SourceService {
    @PrimaryGeneratedColumn({ name: 'source_service_id' })
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Quest, (quest) => quest.sourceService)
    quests?: Quest[];

    @ManyToMany(() => Captcha, (captcha) => captcha.sourceServices)
    captchas?: Captcha[];
}
