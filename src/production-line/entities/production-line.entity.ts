import { Job } from "src/job/entities/job.entity";
import { ProductionMethod } from "src/production-method/entities/production-method.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductionLine {
    @PrimaryGeneratedColumn({ name: 'production_line_id' })
    id: number

    @Column()
    description: string

    @OneToMany(() => Quest, (quest) => quest.productionLine)
    quests: Quest[]

    @ManyToMany(() => ProductionMethod, (productionMethod) => productionMethod.productionLines)
    productionMethods: ProductionMethod[]

    @OneToMany(() => Job, (job) => job.productionLine)
    jobs: Job[]
}
