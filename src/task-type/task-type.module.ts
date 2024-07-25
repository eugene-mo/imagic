import { Module } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { TaskTypeController } from './task-type.controller';

@Module({
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
  exports: [TaskTypeService]
})
export class TaskTypeModule {}
