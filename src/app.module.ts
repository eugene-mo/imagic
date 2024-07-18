import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestModule } from './quest/quest.module';
import { ProductionLineModule } from './production-line/production-line.module';
import { CaptchaModule } from './captcha/captcha.module';
import { SourceServiceModule } from './source-service/source-service.module';
import { UserModule } from './user/user.module';
import { SolutionModule } from './solution/solution.module';

@Module({
  imports: [QuestModule, ProductionLineModule, CaptchaModule, SourceServiceModule, UserModule, SolutionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
