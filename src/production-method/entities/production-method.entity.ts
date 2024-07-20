import { ProductionLine } from "src/production-line/entities/production-line.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductionMethod {
    @PrimaryGeneratedColumn()
    id: number

    //description of image production method 
    @Column()
    description: string

    @ManyToMany(() => ProductionLine, (productionLine) => productionLine.productionMethods)
    productionLines: ProductionLine[]
}
