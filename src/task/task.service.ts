import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveImgService } from 'src/save-img/save-img.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly saveImgService: SaveImgService
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    //****in current version task only can have 'text' or only 'image' (cant create task with text and image in one request)
    const { image, text } = createTaskDto;
    if (text && !image) {
      const taskExist = await this.isTaskExist(createTaskDto);
      if (taskExist) {
        new BadRequestException(`Task type already exist is not found`);
      }
      return await this.taskRepository.save({ type: 'text', text: text })
    } else if (image && !text) {
      const createTask = await this.taskRepository.save({ type: 'image' });
      this.saveTaskImage(createTask.id, image)
    }
    new BadRequestException({ message: `Unsolvable new Task creation case! Task should have only text or only image description` })
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    return this.taskRepository.remove(await this.isTaskExist({ id }))
  }

  async removeAll() {
    console.log('deleting all tasks...')
    const allTasks = await this.findAll();
    return await this.taskRepository.remove(allTasks)
  }

  async isTaskExist(updateTaskDto): Promise<Task> {
    const taskExist = await this.taskRepository.findOne({ where: updateTaskDto });
    return taskExist;
  }

  async saveTaskImage(fileName, taskImg): Promise<void> {
    const TASK_IMAGE_SAVE_PATH = '../static/task-image/';
    await this.saveImgService.saveImage({ data: taskImg, path: TASK_IMAGE_SAVE_PATH, fileName, tryToCompress: true });
  }
}
