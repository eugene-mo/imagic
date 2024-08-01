import { Captcha } from "src/captcha/entities/captcha.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class CaptchaProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Captcha, (captcha) => captcha.provider)
    captchas?: Captcha[];
}
