import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { Repository } from 'typeorm';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { TaskService } from 'src/task/task.service';
import { SaveImgService } from 'src/save-img/save-img.service';

const DEFAULT_CAPTCHA_IMG_LIMIT = 10000;
const CREATE_RECORDS_IF_THEY_NOT_EXIST = true;

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    private readonly sourceServiceService: SourceServiceService,
    private readonly captchaService: CaptchaService,
    private readonly taskService: TaskService,
    private readonly imgService: SaveImgService
  ) { }

  async createQuest(createQuestDto: CreateQuestDto) {
    const { questImage, taskImage } = createQuestDto;
    const service = createQuestDto.service.toLowerCase();
    const captcha = createQuestDto.captcha.toLowerCase();
    const taskText = createQuestDto.taskText?.toLowerCase();

    // Проверка и создание сервиса, если не существует
    let serviceExist = await this.sourceServiceService.isSourceServiceExist({ name: service });
    if (!serviceExist) {
      if (CREATE_RECORDS_IF_THEY_NOT_EXIST) {
        serviceExist = await this.sourceServiceService.create({ name: service }, false);
      } else {
        throw new NotFoundException(`Service '${service}' was not found!`);
      }
    }

    // Проверка и создание капчи, если не существует
    console.log('Check if captcha exist');
    let captchaExist = await this.captchaService.isCaptchaExist({ name: captcha });
    console.log(captchaExist);
    if (!captchaExist) {
      if (CREATE_RECORDS_IF_THEY_NOT_EXIST) {
        captchaExist = await this.captchaService.create({ name: captcha, imageLimit: DEFAULT_CAPTCHA_IMG_LIMIT }, false);
      } else {
        throw new NotFoundException(`Captcha '${captcha}' was not found!`);
      }
    } else {
      // Проверка на превышение лимита изображений
      if (captchaExist.imageNum >= captchaExist.imageLimit) {
        throw new BadRequestException(`Captcha '${captcha}' has exceeded its image limit: ${captchaExist.imageLimit} images`);
      }

      // Проверка существования связи капчи с сервисом
      const isPairedWithService = captchaExist.sourceServices?.some(existingService => existingService.id === serviceExist.id);
      if (!isPairedWithService) {
        if (!captchaExist.sourceServices) {
          captchaExist.sourceServices = [];
        }
        captchaExist.sourceServices.push(serviceExist);
        await this.captchaService.update(captchaExist.id, { sourceServices: captchaExist.sourceServices });
      }
    }

    // Проверка и создание задачи, если не существует
    let taskExist;
    if (taskText) {
      taskExist = await this.taskService.isTaskExist({ text: taskText });
      if (!taskExist) {
        taskExist = await this.taskService.create({ image: taskImage, text: taskText }, false);
      }

      // Проверка существования связи задачи с капчей
      const isTaskPairedWithCaptcha = captchaExist.tasks?.some(existingTask => existingTask.id === taskExist.id);
      if (!isTaskPairedWithCaptcha) {
        if (!captchaExist.tasks) {
          captchaExist.tasks = [];
        }
        captchaExist.tasks.push(taskExist);
        await this.captchaService.update(captchaExist.id, { tasks: captchaExist.tasks });
      }
    } else {
      throw new BadRequestException(`Task text is required to create a task.`);
    }

    // Создание и сохранение квеста
    const newQuest = this.questRepository.create({
      sourceService: serviceExist,
      task: taskExist,
      captcha: captchaExist,
      createdAt: new Date(),
    });

    try {
      const savedQuest = await this.questRepository.save(newQuest);
      const saveQuestImgName = `${savedQuest.id}.jpg`;
      await this.imgService.saveQuestOriginalImage({ imgName: saveQuestImgName, imgData: questImage, compressQuality: 25 });

      // Увеличение счетчика imageNum в капче
      captchaExist.imageNum += 1;
      await this.captchaService.update(captchaExist.id, { imageNum: captchaExist.imageNum });

      return savedQuest;
    } catch (e) {
      await this.taskService.remove(taskExist.id);
      throw e;
    }
  }

  async findAll() {
    return await this.questRepository.find({
      relations: ['task', 'captcha', 'sourceService', 'status', 'productionLine', 'jobs'],
    });
  }

  async findOne(id: number) {
    return await this.questRepository.findOne({
      where: { id },
      relations: ['task', 'captcha', 'sourceService', 'status', 'productionLine', 'jobs'],
    });
  }

  async update(id: number, updateQuestDto: any) {
    // Реализация метода обновления
  }

  async remove(id: number) {
    return await this.questRepository.delete(id);
  }
}
