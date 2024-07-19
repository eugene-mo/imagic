import { Quest } from "src/quest/entities/quest.entity";
import { TaskType } from "src/task-type/entities/task-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    id: number

    @OneToOne(() => Quest, (quest) => quest.task)
    quest: Quest

    //example - unique text task / unique image task 
    @ManyToOne(() => TaskType, (taskType) => taskType.tasks)
    @JoinColumn({ name: 'task_type_id' })
    type: TaskType

    //if task has not classified text description and cant be 'typed' - task description text will be written to "uniqueText" column
    @Column()
    uniqueText: string

    //if task has image task description - image will be located by address ../static/task-image/__quest_id.jpeg
    @Column()
    uniqueImage: Boolean
}
