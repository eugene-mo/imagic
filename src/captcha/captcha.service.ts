import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCaptchaDto } from './dto/create-captcha.dto';
import { UpdateCaptchaDto } from './dto/update-captcha.dto';
import { Captcha } from './entities/captcha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaptchaProviderService } from 'src/captcha-provider/captcha-provider.service';

@Injectable()
export class CaptchaService {
  constructor(
    private readonly captchaProviderService: CaptchaProviderService,
    @InjectRepository(Captcha)
    private readonly captcha: Repository<Captcha>
  ) { }

  async create(createCaptchaDto: CreateCaptchaDto): Promise<Captcha | BadRequestException> {
    const captchaName = createCaptchaDto.name;
    const providerName = createCaptchaDto.captchaProvider;
    const imageLimit = createCaptchaDto.imageLimit;

    const captchaExist = await this.isCaptchaExist({ name: captchaName });

    if (captchaExist) {
      return new BadRequestException(`Captcha with name '${captchaName}' already exist!`)
    }

    const captchaProvider = await this.captchaProviderService.isCaptchaProviderExist({ name: providerName })

    if (!captchaProvider) {
      return new BadRequestException(`Captcha provider with name '${providerName}' not found!`)
    }

    const newCaptcha = await this.captcha.save({
      name: captchaName,
      provider: captchaProvider,
      imageLimit: imageLimit,
      imageNum: 0
    });

    return newCaptcha;
  }

  async findAll(): Promise<Captcha[]> {
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

  async isCaptchaExist(UpdateCaptchaDto): Promise<Boolean | Captcha> {
    const captcha = await this.captcha.findOne({ where: UpdateCaptchaDto });
    if (captcha) {
      return captcha;
    } else {
      return false;
    }
  }
}
