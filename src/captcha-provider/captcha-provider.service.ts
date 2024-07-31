import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCaptchaProviderDto } from './dto/create-captcha-provider.dto';
import { UpdateCaptchaProviderDto } from './dto/update-captcha-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptchaProvider } from './entities/captcha-provider.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CaptchaProviderService {
  constructor(
    @InjectRepository(CaptchaProvider)
    private readonly captchaProvider: Repository<CaptchaProvider>
  ) { }

  async create(createCaptchaProviderDto: CreateCaptchaProviderDto, checkExist = true) {
    const captchaProviderName = createCaptchaProviderDto.name;
    var providerExist;
    if (checkExist) {
      providerExist = await this.isCaptchaProviderExist({ name: captchaProviderName })
    }

    if (providerExist) {
      new BadRequestException(`Captcha provider with name "${captchaProviderName}" already exist!`)
    }

    const newProvider = await this.captchaProvider.save({
      name: captchaProviderName
    });

    return newProvider;
  }

  async findAll(): Promise<CaptchaProvider[] | CaptchaProvider> {
    return await this.captchaProvider.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} captchaProvider`;
  }

  update(id: number, updateCaptchaProviderDto: UpdateCaptchaProviderDto) {
    return `This action updates a #${id} captchaProvider`;
  }

  async remove(id: number) {
    const capProviderToDelete = await this.isCaptchaProviderExist({ id });
    if (capProviderToDelete) {
      return await this.captchaProvider.remove(capProviderToDelete)
    } else {
      throw new NotFoundError(`Captcha provider with id - ${id} is not found!`)
    }
  }

  async isCaptchaProviderExist(updateCaptchaProviderDto: UpdateCaptchaProviderDto): Promise<CaptchaProvider> {
    const provider = await this.captchaProvider.findOne({ where: updateCaptchaProviderDto });
    return provider;
  }
}
