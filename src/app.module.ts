import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestModule } from './quest/quest.module';
import { ProductionLineModule } from './production-line/production-line.module';
import { CaptchaModule } from './captcha/captcha.module';
import { SourceServiceModule } from './source-service/source-service.module';
import { UserModule } from './user/user.module';
import { SolutionModule } from './solution/solution.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JobModule } from './job/job.module';
import { ProductionMethodModule } from './production-method/production-method.module';
import { CaptchaProviderModule } from './captcha-provider/captcha-provider.module';
import { SolutionTypeModule } from './solution-type/solution-type.module';
import { AuthModule } from './auth/auth.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { SaveImgModule } from './save-img/save-img.module';

@Module({
  imports: [
    QuestModule, ProductionLineModule, CaptchaModule, SourceServiceModule, UserModule,
    SolutionModule, TaskModule, ConfigModule.forRoot({ isGlobal: true }),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        // entities: [__dirname + '/**/*.entity.{.js,.ts}'],
        entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
      }),
      inject: [ConfigService]
    }),
    JobModule,
    ProductionMethodModule,
    CaptchaProviderModule,
    SolutionTypeModule,
    AuthModule,
    SaveImgModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
