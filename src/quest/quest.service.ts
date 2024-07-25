import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { Repository } from 'typeorm';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { TaskTypeService } from 'src/task-type/task-type.service';

@Injectable()
export class QuestService {

  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    private readonly sourceServiceService: SourceServiceService,
    private readonly captchaService: CaptchaService,
    private readonly taskTypeService: TaskTypeService
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
    const { questImage, service, taskText, captcha } = createQuestDto;
    var serviceExist, taskTextTypeExist, captchaExist;

    var errors = [];

    await Promise.all([
      (async () => {
        serviceExist = await this.sourceServiceService.isSourceServiceExist({ name: service })
        if (!serviceExist) {
          errors.push('Service not found!');
        }
        return serviceExist;
      })(),
      (async () => {
        captchaExist = await this.captchaService.isCaptchaExist({ name: captcha })
        if (!captchaExist) {
          errors.push('Captcha not found!');
        }
        return captchaExist;
      })()
    ]);


    if (this.isCanCreateNewQuest(createQuestDto)) {
      console.log('Quest Create Errors:', errors)
      return new BadRequestException({ message: errors })
    }

    return false;
  }
}
