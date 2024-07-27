import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { Repository } from 'typeorm';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class QuestService {

  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    private readonly sourceServiceService: SourceServiceService,
    private readonly captchaService: CaptchaService,
    private readonly taskService: TaskService
  ) { }

  async createQuest(createQuestDto: any) {
    const { questImage, service, taskText, captcha } = createQuestDto;

    return createQuestDto

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

  async isCanCreateNewQuest(createQuestDto: CreateQuestDto): Promise<Boolean | BadRequestException> {
    const { questImage, service, taskText, captcha, taskImage } = createQuestDto;
    // var serviceExist, taskExist, captchaExist;

    const serviceExist = await this.sourceServiceService.isSourceServiceExist({ name: service })
    if (!serviceExist) {
      return new BadRequestException(`Service '${service}' is not found`);
    }
    const captchaExist = await this.captchaService.isCaptchaExist({ name: captcha, service: serviceExist })
    if (!captchaExist) {
      return new BadRequestException(`Service '${service}' don't have captcha '${captcha}'`)
    }

    const taskExist = await this.taskService.create({ taskImage, taskText })
    //check if task text sent in createQuestDto (text of task was sent from service side)



    return false;
  }
}
