import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { TaskType } from 'src/task-type/entities/task-type.entity';
import { Captcha } from 'src/captcha/entities/captcha.entity';
import { SourceService } from 'src/source-service/entities/source-service.entity';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { TaskTypeService } from 'src/task-type/task-type.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { CaptchaProvider } from 'src/captcha-provider/entities/captcha-provider.entity';
import { CaptchaProviderService } from 'src/captcha-provider/captcha-provider.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quest, TaskType, Captcha, SourceService, CaptchaProvider]), NestjsFormDataModule
  ],
  controllers: [QuestController],
  providers: [QuestService, SourceServiceService, TaskTypeService, CaptchaService, CaptchaProviderService],
})
export class QuestModule { }
