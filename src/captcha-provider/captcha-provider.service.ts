import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCaptchaProviderDto } from './dto/create-captcha-provider.dto';
import { UpdateCaptchaProviderDto } from './dto/update-captcha-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptchaProvider } from './entities/captcha-provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaptchaProviderService {
  constructor(
    @InjectRepository(CaptchaProvider)
    private readonly captchaProvider: Repository<CaptchaProvider>
  ) { }

  async create(createCaptchaProviderDto: CreateCaptchaProviderDto) {
    const captchaProviderName = createCaptchaProviderDto.name;
    const providerExist = await this.captchaProvider.findOne({
      where: {
        name: captchaProviderName
      }
    })

    if (providerExist) {
      return new BadRequestException(`Captcha provider with name "${captchaProviderName}" already exist!`)
    }

    const newProvider = await this.captchaProvider.save({
      name: captchaProviderName
    });

    return newProvider;
  }

  async findAll() {
    return await this.captchaProvider.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} captchaProvider`;
  }

  update(id: number, updateCaptchaProviderDto: UpdateCaptchaProviderDto) {
    return `This action updates a #${id} captchaProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} captchaProvider`;
  }

  async isCaptchaProviderExist(updateCaptchaProviderDto) {
    const provider = await this.captchaProvider.findOne({ where: updateCaptchaProviderDto });
    if (provider) {
      return provider;
    } else {
      return false;
    }
  }
}
