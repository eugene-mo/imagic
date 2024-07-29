import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { SaveImgService } from 'src/save-img/save-img.service';
import { SaveImgModule } from 'src/save-img/save-img.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), SaveImgModule],
  controllers: [TaskController],
  providers: [TaskService, SaveImgService],
  exports: [TaskService]
})
export class TaskModule { }
