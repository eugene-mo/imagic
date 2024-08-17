import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const captchaProviderName = createCaptchaProviderDto.name.toLowerCase();
    var providerExist;
    if (checkExist) {
      providerExist = await this.isCaptchaProviderExist({ name: captchaProviderName })
    }

    if (providerExist) {
      throw new BadRequestException(`Captcha provider with name "${captchaProviderName}" already exist!`)
    }

    const newProvider = await this.captchaProvider.save({
      name: captchaProviderName
    });

    return newProvider;
  }

  async findAll(): Promise<CaptchaProvider[] | CaptchaProvider> {
    return await this.captchaProvider.find(
      { relations: ['captchas'], }
    );
  }

  async findOne(id: number) {
    return await this.captchaProvider.findOne({ where: { id } })
  }

  update(id: number, updateCaptchaProviderDto: UpdateCaptchaProviderDto) {
    return `This action updates a #${id} captchaProvider`;
  }

  async remove(id: number) {
    const capProviderToDelete = await this.isCaptchaProviderExist({ id });
    if (capProviderToDelete) {
      return await this.captchaProvider.remove(capProviderToDelete)
    } else {
      throw new NotFoundException(`Captcha provider with id - ${id} is not found!`)
    }
  }

  async isCaptchaProviderExist(updateCaptchaProviderDto: UpdateCaptchaProviderDto): Promise<CaptchaProvider> {
    const provider = await this.captchaProvider.findOne({ where: updateCaptchaProviderDto });
    return provider;
  }
}
