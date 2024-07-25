import { ProductionLine } from "src/production-line/entities/production-line.entity";
import { Quest } from "src/quest/entities/quest.entity";
import { Task } from "src/task/entities/task.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {
    //produced images stored in folder ../static/job-image
    @PrimaryGeneratedColumn({ name: 'job_id' })
    id: number

    @ManyToOne(() => Quest, (quest) => quest.jobs)
    @JoinColumn({ name: 'quest_id' })
    quest: Quest

    @ManyToOne(() => ProductionLine, (productionLine) => productionLine.jobs)
    @JoinColumn({ name: 'production_line_id' })
    productionLine: ProductionLine
    
    @ManyToOne(() => Task, (task) => task.jobs)
    @JoinColumn({ name: 'task_id' })
    task: Task
}
