import { Quest } from "src/quest/entities/quest.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductionLine {
    @PrimaryGeneratedColumn({ name: 'production_line_id' })
    id: number

    @Column()
    description: string

    @OneToMany(() => Quest, (quest) => quest.productionLine)
    quests: Quest[]
}
