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
import { TaskTypeModule } from './task-type/task-type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JobModule } from './job/job.module';
import { ProductionMethodModule } from './production-method/production-method.module';

@Module({
  imports: [
    QuestModule, ProductionLineModule, CaptchaModule, SourceServiceModule, UserModule,
    SolutionModule, TaskModule, TaskTypeModule, ConfigModule.forRoot({ isGlobal: true }),
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
    ProductionMethodModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
