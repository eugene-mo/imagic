import { Captcha } from "src/captcha/entities/captcha.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CaptchaProvider {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Captcha, (captcha) => captcha.provider)
    captchas: Captcha[]
}
