import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { TaskType } from 'src/task-type/entities/task-type.entity';
import { Captcha } from 'src/captcha/entities/captcha.entity';
import { SourceService } from 'src/source-service/entities/source-service.entity';
// import { UploadController } from 'src/_global/upload/upload.service';

@Module({
  imports: [
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    TypeOrmModule.forFeature([Quest, TaskType, Captcha, SourceService]),
  ],
  controllers: [QuestController],
  providers: [QuestService],
})
export class QuestModule { }
