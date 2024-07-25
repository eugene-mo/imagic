import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { Repository } from 'typeorm';
import { TaskType } from 'src/task-type/entities/task-type.entity';
import { Captcha } from 'src/captcha/entities/captcha.entity';
import { SourceService } from 'src/source-service/entities/source-service.entity';

@Injectable()
export class QuestService {

  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
    @InjectRepository(Captcha)
    private readonly captchaRepository: Repository<Captcha>,
    @InjectRepository(SourceService)
    private readonly sourceServiceRepository: Repository<SourceService>
  ) { }

  async createQuest(createQuestDto: any) {
    const { questImage, service, taskText, captcha } = createQuestDto;
    var errors = [];
    var serviceExist, taskTextTypeExist, captchaExist;
    await Promise.all([
      (async () => {
        serviceExist = await this.sourceServiceRepository.findOne(
          {
            where: {
              name: service
            }
          }
        )
        if (!serviceExist) {
          errors.push('Service not found!');
        }
        return serviceExist;
      })(),
      (async () => {
        captchaExist = await this.captchaRepository.findOne({
          where: {
            name: captcha
          }
        })
        if (!captchaExist) {
          errors.push('Captcha not found!');
        }
        return captchaExist;
      })(),
      (async () => {
        taskTextTypeExist = await this.taskTypeRepository.findOne({
          where: {
            text: taskText
          }
        })
        return taskTextTypeExist;
      })()
    ]);

    if (errors.length) {
      console.log('Quest Create Errors:', errors)
      return new BadRequestException({ message: errors })
    }

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
}
