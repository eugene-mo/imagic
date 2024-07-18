import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Quest {
    @PrimaryGeneratedColumn({ name: 'quest_id' })
    id: number

    //дата когда квест-картинка поступила в систему (когда прислали скрин из сервиса)
    @CreateDateColumn()
    createdAt: Date

    //дата когда квест-картинка была подготовлена к решению (дата обработки)
    @UpdateDateColumn()
    producedAt: Date

    //дата когда квест-картинка была полностью решена
    @UpdateDateColumn()
    solvedAt: Date

    
}