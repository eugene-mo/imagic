import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { Repository } from 'typeorm';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { TaskService } from 'src/task/task.service';
import { SaveImgService } from 'src/save-img/save-img.service';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { TranslationService } from 'src/translation/translation.service';

const DEFAULT_CAPTCHA_IMG_LIMIT = 10000;
const CREATE_CAPTCHA_RECORDS_IF_THEY_NOT_EXIST = true;
const CREATE_SERVICE_RECORDS_IF_THEY_NOT_EXIST = false;
const TRANSLATE_TASK_TEXT_TO_ENG = true;
const DEFAULT_PAGINATION_SIZE = 30;

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    private readonly sourceServiceService: SourceServiceService,
    private readonly captchaService: CaptchaService,
    private readonly taskService: TaskService,
    private readonly translationService: TranslationService,
    private readonly imgService: SaveImgService
  ) { }

  async createQuest(createQuestDto: CreateQuestDto) {
    const { questImage, taskImage } = createQuestDto;
    const service = createQuestDto.service.toLowerCase();
    const captcha = createQuestDto.captcha.toLowerCase();
    const taskText = createQuestDto.taskText?.toLowerCase();

    if (!taskText) {
      throw new BadRequestException(`Task text is required to create a task.`);
    }

    // checking is service exist
    let serviceExist = await this.sourceServiceService.isSourceServiceExist({ name: service });
    if (!serviceExist) {
      if (CREATE_SERVICE_RECORDS_IF_THEY_NOT_EXIST) {
        serviceExist = await this.sourceServiceService.create({ name: service }, false);
      } else {
        throw new NotFoundException(`Service '${service}' was not found!`);
      }
    }

    // checking if captcha exist
    console.log('Check if captcha exist');
    let captchaExist = await this.captchaService.isCaptchaExist({ name: captcha });
    console.log(captchaExist);
    if (!captchaExist) {
      if (CREATE_CAPTCHA_RECORDS_IF_THEY_NOT_EXIST) {
        captchaExist = await this.captchaService.create({ name: captcha, imageLimit: DEFAULT_CAPTCHA_IMG_LIMIT }, false);
      } else {
        throw new NotFoundException(`Captcha '${captcha}' was not found!`);
      }
    } else {
      // Checking image num limit
      if (captchaExist.imageNum >= captchaExist.imageLimit) {
        throw new BadRequestException(`Captcha '${captcha}' has exceeded its image limit: ${captchaExist.imageLimit} images`);
      }

      // Checking if relationships exist (captcha + service)
      const isPairedWithService = captchaExist.sourceServices?.some(existingService => existingService.id === serviceExist.id);
      if (!isPairedWithService) {
        if (!captchaExist.sourceServices) {
          captchaExist.sourceServices = [];
        }
        captchaExist.sourceServices.push(serviceExist);
        await this.captchaService.update(captchaExist.id, { sourceServices: captchaExist.sourceServices });
      }
    }

    // Checking if task exist
    let taskExist;
    let finalTaskText;
    if (TRANSLATE_TASK_TEXT_TO_ENG) {
      finalTaskText = (await this.translationService.translateText(taskText)).translation;
    } else {
      finalTaskText = taskText.trim().toLowerCase();
    }

    taskExist = await this.taskService.isTaskExist({ text: finalTaskText });
    if (!taskExist) {
      taskExist = await this.taskService.create({ image: taskImage, text: finalTaskText }, false);
    }

    // checking relationships between captcha and task
    const isTaskPairedWithCaptcha = captchaExist.tasks?.some(existingTask => existingTask.id === taskExist.id);
    if (!isTaskPairedWithCaptcha) {
      if (!captchaExist.tasks) {
        captchaExist.tasks = [];
      }
      captchaExist.tasks.push(taskExist);
      await this.captchaService.update(captchaExist.id, { tasks: captchaExist.tasks });
    }

    // Creating and save quest
    const newQuest = this.questRepository.create({
      sourceService: serviceExist,
      task: taskExist,
      captcha: captchaExist,
      createdAt: new Date(),
    });

    let savedQuest, saveQuestImgName;
    try {
      savedQuest = await this.questRepository.save(newQuest);
      saveQuestImgName = `${savedQuest.id}.jpg`;
      await this.imgService.saveQuestOriginalImage({ imgName: saveQuestImgName, imgData: questImage, compressQuality: 25 });

      // Counter change in DB
      captchaExist.imageNum += 1;
      await this.captchaService.update(captchaExist.id, { imageNum: captchaExist.imageNum });

      return savedQuest;
    } catch (e) {
      // await this.taskService.remove(taskExist.id);
      console.log('IMAGE SAVING ERROR')
      console.log(e)
      throw e;
    }
  }

  async findAll() {
    //get all quests data
    return await this.questRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: DEFAULT_PAGINATION_SIZE,
      relations: ['task', 'captcha', 'sourceService', 'status', 'productionLine', 'jobs'],
    });
  }

  async findOne(id: number) {
    //find quest by id
    return await this.questRepository.findOne({
      where: { id },
      relations: ['task', 'captcha', 'sourceService', 'status', 'productionLine', 'jobs'],
    });
  }

  async update(id: number, updateQuestDto) {
    const questExist = this.isQuestExist({ id: id });
    if (questExist) {
      return await this.questRepository.update(id, updateQuestDto);
    }
    throw new NotFoundException(`Can't UPDATE. Quest with id : ${id} was not found!`)
  }

  async remove(id: number) {
    //remove quest by id
    const questExist = this.isQuestExist({ id: id });
    if (questExist) {
      return await this.questRepository.delete(id);
    }
    throw new NotFoundException(`Can't DELETE. Quest with id : ${id} was not found!`)
  }

  async isQuestExist(updateQuestDto): Promise<Quest> {
    return await this.questRepository.findOne({
      where: updateQuestDto
    })
  }

}
