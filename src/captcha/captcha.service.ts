import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCaptchaDto } from './dto/create-captcha.dto';
import { UpdateCaptchaDto } from './dto/update-captcha.dto';
import { Captcha } from './entities/captcha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaptchaProvider } from 'src/captcha-provider/entities/captcha-provider.entity';

@Injectable()
export class CaptchaService {
  constructor(
    @InjectRepository(Captcha)
    private readonly captcha: Repository<Captcha>,
    @InjectRepository(CaptchaProvider)
    private readonly captchaProvider: Repository<CaptchaProvider>
  ) { }

  async create(createCaptchaDto: CreateCaptchaDto) {
    const captchaName = createCaptchaDto.name;
    const providerExist = await this.captcha.findOne({
      where: {
        name: captchaName
      }
    })

    if (providerExist) {
      return new BadRequestException(`Captcha with name '${captchaName}' already exist!`)
    }

    const captchaProvider = await this.captchaProvider.findOne({
      where: {
        name: createCaptchaDto.captchaProvider
      }
    });

    if (!captchaProvider) {
      return new BadRequestException(`Captcha provider with name '${createCaptchaDto.captchaProvider}' not found!`)
    }

    const newProvider = await this.captcha.save({
      name: captchaName,
      provider: captchaProvider,
      imageNum: 0,
      imageLimit: createCaptchaDto.imageLimit
    });

    return newProvider;
  }

  async findAll() {
    return await this.captcha.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} captcha`;
  }

  update(id: number, updateCaptchaDto: UpdateCaptchaDto) {
    return `This action updates a #${id} captcha`;
  }

  remove(id: number) {
    return `This action removes a #${id} captcha`;
  }
}
