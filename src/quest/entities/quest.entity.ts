import { Task } from "src/task/entities/task.entity";
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Quest {
    @PrimaryGeneratedColumn({ name: 'quest_id' })
    id: number

    //date when quest-image with task description was added to database (user sent quest-image screen)
    @CreateDateColumn()
    createdAt: Date

    //date when quest-image was prepared for classification (image was produced through production line) 
    @UpdateDateColumn()
    producedAt: Date

    //date when quest-image was fully solved and solution was added to database (object(s) on image was classified)
    @UpdateDateColumn()
    solvedAt: Date

    // 
    @OneToOne(() => Task, (task) => task.quest)
    @JoinColumn({ name: 'task_id' })
    task: Task
    
    
}