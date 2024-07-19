import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quest } from "./quest.entity";

@Entity()
export class QuestStatus {
    @PrimaryGeneratedColumn({ name: 'quest_status_id' })
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @OneToMany(() => Quest, (quest) => quest.status)
    quests: Quest[]
}

// export interface IQuestStatus {
//     LOADING         // the record of quest is created in database but image is loading
//     ERROR           // some error happened or loading not finished
//     NEW             // the quest image was successfully loaded and all quest data was successfully saved in DB
//     PROCESSING      // image in production and preparing to classification process (minifying and etc - using production line algo)
//     READY_FOR_WORK  // original image was successfully prepared for classification (minified, etc) -> jobs with images was created
//     IN_WORK         // jobs created from original image is in classification process (work not finished)
//     CLASSIFIED      // all objects from jobs was successfully classified -> jobs objects ready to use for training
//    * MODEL_TRAINING // - object is using in model training right now
//    * TRAINED        // - картинка обработана неронкой
//    * DELETING       // - удаляем картинку и все язанные файлы (типа артинки заданий)
//    * DELETED        // - картинка удалена ( но информацию о таске можно сохранить)
// }