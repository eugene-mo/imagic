import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
// import { UploadController } from 'src/_global/upload/upload.service';

@Module({
  controllers: [QuestController],
  providers: [QuestService],
})
export class QuestModule { }
