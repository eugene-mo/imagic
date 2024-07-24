import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
// import { UploadController } from 'src/_global/upload/upload.service';

@Module({
  imports: [
    NestjsFormDataModule.config({ storage: MemoryStoredFile })
  ],
  controllers: [QuestController],
  providers: [QuestService],
})
export class QuestModule { }
