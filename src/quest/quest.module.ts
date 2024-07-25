import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { Captcha } from 'src/captcha/entities/captcha.entity';
import { SourceService } from 'src/source-service/entities/source-service.entity';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { CaptchaProvider } from 'src/captcha-provider/entities/captcha-provider.entity';
import { CaptchaProviderService } from 'src/captcha-provider/captcha-provider.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TaskService } from 'src/task/task.service';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quest, Captcha, SourceService, CaptchaProvider, Task]), NestjsFormDataModule
  ],
  controllers: [QuestController],
  providers: [QuestService, SourceServiceService, CaptchaService, CaptchaProviderService, TaskService],
})
export class QuestModule { }
