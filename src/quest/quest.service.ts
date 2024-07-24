import { Injectable } from '@nestjs/common';
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
    private readonly sourceServiceRepository: Repository<SourceService>,
    // private readonly jwtService: JwtService,
  ) { }
  createQuest(createQuestDto: any) {
    const { questImage, ...other } = createQuestDto;
    const { buffer, ...imgInfo } = questImage;
    return { other, questImage: imgInfo }
    //   const fieldName = 'questImage', destination = './static/original-image/', filenamePrefix = 'questImage';
    //   // diskStorage({
    //   //   destination,
    //   //   filename: (req, file, callback) => {
    //   //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //   //     const ext = extname(file.originalname);
    //   //     callback(null, `test-image.jpg`);
    //   //   },
    //   console.log('REQUEST POST')
    //   console.log(createQuestDto)
    //   // })

    //   FileInterceptor(fieldName, {
    //     storage: diskStorage({
    //       destination,
    //       filename: (req, file, callback) => {
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //         const ext = extname(file.originalname);
    //         callback(null, `${filenamePrefix}-${uniqueSuffix}${ext}`);
    //       },
    //     }),
    //   });
    return 'asdasd'
  }

  findAll() {
    return `This action returns all quest`;
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
