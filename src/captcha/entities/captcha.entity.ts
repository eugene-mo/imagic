import { Quest } from "src/quest/entities/quest.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Captcha {
    @PrimaryGeneratedColumn({ name: 'captcha_id' })
    id: number

    @OneToMany(() => Quest, (quest) => quest.captcha)
    quests: Quest[]
}
