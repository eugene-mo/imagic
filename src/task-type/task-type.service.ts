import { Injectable } from '@nestjs/common';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypeService {
  create(createTaskTypeDto: CreateTaskTypeDto) {
    return 'This action adds a new taskType';
  }

  findAll() {
    return `This action returns all taskType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskType`;
  }

  update(id: number, updateTaskTypeDto: UpdateTaskTypeDto) {
    return `This action updates a #${id} taskType`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskType`;
  }
}
