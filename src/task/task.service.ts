import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task | BadRequestException> {
    //****in current version task only can have 'text' or only 'image' (cant be text task with image in one request)
    const { taskImage, taskText } = createTaskDto;
    if (taskText && !taskImage) {
      const taskExist = await this.isTaskExist(createTaskDto);
      if (taskExist) {
        return new BadRequestException(`Task type already exist is not found`);
      }
      return await this.taskRepository.save({ type: 'text', text: taskText })
    } else if (taskImage && !taskText) {
      const createTask = await this.taskRepository.save({ type: 'image' });
    }
    return new BadRequestException({ message: `Unsolvable new Task creation case! Task should have only text or only image description` })
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async saveTaskImage(taskId) {

  }

  async isTaskExist(updateTaskDto): Promise<Boolean | Task> {
    const taskExist = await this.taskRepository.findOne({ where: updateTaskDto });
    if (taskExist) {
      return taskExist
    } else {
      return false
    }
  }
}
