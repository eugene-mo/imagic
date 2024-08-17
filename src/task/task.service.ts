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

  async create(createTaskDto: CreateTaskDto, checkExist = true) {
    //****in current version task only can have 'text' or only 'image' (cant create task with text and image in one request)
    const { image, text } = createTaskDto;
    if (text && !image) {
      let taskExist;
      if (checkExist) {
        taskExist = await this.isTaskExist(createTaskDto);
      }
      if (taskExist) {
        throw new BadRequestException(`Can't create task! Task type already exist!`);
      }
      return await this.taskRepository.save({ type: 'text', text: text })
    } else if (image && !text) {
      const createTask = await this.taskRepository.save({ type: 'image' });
      this.saveTaskImage(createTask.id, image)
    }
    throw new BadRequestException({ message: `Unsolvable new Task creation case! Task should have only text or only image description` })
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['captchas'],
    })
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({ where: { id } })
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    return await this.taskRepository.remove(await this.isTaskExist({ id }))
  }

  async removeAll() {
    console.log('deleting all tasks...')
    const allTasks = await this.findAll();
    return await this.taskRepository.remove(allTasks)
  }

  async isTaskExist(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskExist = await this.taskRepository.findOne({ where: updateTaskDto });
    return taskExist;
  }

  async saveTaskImage(fileName, taskImg) {
    const TASK_IMAGE_SAVE_PATH = '../static/task-image/';
    return await this.saveImgService.saveJpgImg({ data: taskImg, path: TASK_IMAGE_SAVE_PATH, fileName, compressQuality: 100 });
  }
}
