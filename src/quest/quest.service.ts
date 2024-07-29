import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { Repository } from 'typeorm';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { TaskService } from 'src/task/task.service';

const DEFAULT_CAPTCHA_IMG_LIMIT = 10000;
@Injectable()
export class QuestService {

  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    private readonly sourceServiceService: SourceServiceService,
    private readonly captchaService: CaptchaService,
    private readonly taskService: TaskService
  ) { }

  async createQuest(createQuestDto: CreateQuestDto) {
    const { questImage, taskImage } = createQuestDto;
    const service = createQuestDto.service.toLowerCase();
    const taskText = createQuestDto.taskText.toLowerCase();
    const captcha = createQuestDto.captcha.toLowerCase();
    // var serviceExist, taskExist, captchaExist;

    var serviceExist = await this.sourceServiceService.isSourceServiceExist({ name: service })
    if (!serviceExist) {
      //create without check (because we checked before)
      serviceExist = await this.sourceServiceService.create({ name: service }, false)
    }

    var captchaExist = await this.captchaService.isCaptchaExist({ name: captcha })
    if (!captchaExist) {
      captchaExist = await this.captchaService.create({ name: captcha, imageLimit: DEFAULT_CAPTCHA_IMG_LIMIT })
    } else {
      //if captcha exist - also check is relations between captcha and service exits - if not - add this relations
      if (captchaExist.sourceServices.some(existingService => existingService.id === service.id)) {
        throw new BadRequestException(`Captcha '${captchaName}' is already paired with service '${serviceName}'`);
      }
    }

    const taskExist = await this.taskService.create({ image: taskImage, text: taskText })
    //check if task text sent in createQuestDto (text of task was sent from service side)

    const newQuest = {
      questImage,
      sourceService: serviceExist,
      task: taskExist,
      captcha: captchaExist,
      producedAt: null,

    };

    try {
      const savedQuest = await this.questRepository.save(newQuest);
      return savedQuest;
    } catch (e) {
      await this.taskService.remove(taskExist.id)
      return e
    }

  }

  async findAll() {
    return await this.questRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} quest`;
  }

  update(id: number, updateQuestDto: UpdateQuestDto) {
    return `This action updates a #${id} quest`;
  }

  remove(id: number) {
    return `This action removes a #${id} quest`;
  }

}
