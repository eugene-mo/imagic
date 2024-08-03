import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaptchaDto } from './dto/create-captcha.dto';
import { UpdateCaptchaDto } from './dto/update-captcha.dto';
import { Captcha } from './entities/captcha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaptchaProviderService } from 'src/captcha-provider/captcha-provider.service';
import { pairCaptchaToServiceDto } from './dto/pair-to-service.dto';
import { SourceServiceService } from 'src/source-service/source-service.service';
import { SourceService } from 'src/source-service/entities/source-service.entity';

@Injectable()
export class CaptchaService {
  constructor(
    private readonly captchaProviderService: CaptchaProviderService,
    private readonly sourceServiceService: SourceServiceService,
    @InjectRepository(Captcha)
    private readonly captchaRepository: Repository<Captcha>,
    @InjectRepository(SourceService)
    private readonly sourceServiceRepository: Repository<SourceService>
  ) { }

  async create(createCaptchaDto: CreateCaptchaDto, checkExist = true): Promise<Captcha> {
    const captchaName = createCaptchaDto.name?.toLowerCase();
    const imageLimit = createCaptchaDto.imageLimit;

    const providerName = createCaptchaDto.provider || null;
    const sourceServiceNames = createCaptchaDto.sourceServices || [];

    if (checkExist) {
      const captchaExist = await this.isCaptchaExist({ name: captchaName });
      if (captchaExist) {
        throw new BadRequestException(`Captcha with name '${captchaName}' already exists!`);
      }
    }

    let captchaProvider = null;
    if (providerName) {
      captchaProvider = await this.captchaProviderService.isCaptchaProviderExist({ name: providerName });
      if (!captchaProvider) {
        captchaProvider = await this.captchaProviderService.create({ name: providerName }, false);
      }
    }

    const sourceServices = await Promise.all(
      sourceServiceNames.map(async ({ name }) => {
        let service = await this.sourceServiceService.isSourceServiceExist({ name });
        if (!service) {
          service = await this.sourceServiceService.create({ name });
        }
        return service;
      })
    );

    const newCaptcha = this.captchaRepository.create({
      name: captchaName,
      imageLimit: imageLimit || null,
      provider: captchaProvider || null,
      imageNum: 0,
      sourceServices: sourceServices || null,
    });

    return this.captchaRepository.save(newCaptcha);
  }

  async findAll(): Promise<Captcha[]> {
    return await this.captchaRepository.find({
      relations: ['provider',  'sourceServices'], //relations: ['provider', 'quests', 'tasks', 'sourceServices'],
      order: {
        name: 'ASC',
      }
    }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} captcha`;
  }

  async update(id: number, updateCaptchaDto: UpdateCaptchaDto, checkExist = true): Promise<Captcha> {
    let captcha;
    if (checkExist) {
      captcha = await this.isCaptchaExist({ id });
      if (!captcha) {
        throw new NotFoundException(`Captcha with ID ${id} not found`);
      }
    }

    const { name, imageLimit, provider } = updateCaptchaDto;

    if (name) {
      captcha.name = name;
    }

    if (imageLimit !== undefined) {
      captcha.imageLimit = imageLimit;
    }

    if (provider) {
      const captchaProvider = await this.captchaProviderService.isCaptchaProviderExist({ name: provider });
      if (!captchaProvider) {
        throw new BadRequestException(`Captcha provider with name '${provider}' not found`);
      }
      captcha.provider = captchaProvider;
    }

    return this.captchaRepository.save(captcha);
  }

  async pairToService(pairToServiceDto: pairCaptchaToServiceDto): Promise<Captcha> {
    const { captchaName, serviceName } = pairToServiceDto;

    const captcha = await this.isCaptchaExist({ name: captchaName });
    if (!captcha) {
      throw new NotFoundException(`Captcha with name '${captchaName}' not found`);
    }

    const service = await this.sourceServiceService.isSourceServiceExist({ name: serviceName });
    if (!service) {
      throw new NotFoundException(`SourceService with name '${serviceName}' not found`);
    }

    if (captcha.sourceServices.some(existingService => existingService.id === service.id)) {
      throw new BadRequestException(`Captcha '${captchaName}' is already paired with service '${serviceName}'`);
    }

    captcha.sourceServices.push(service);
    return this.captchaRepository.save(captcha);
  }

  async remove(id: number) {
    const captcha = await this.isCaptchaExist({ id });
    if (!captcha) {
      throw new NotFoundException(`Captcha with ID ${id} not found`);
    }
    return this.captchaRepository.remove(captcha);
  }

  async isCaptchaExist(query: Partial<Captcha>): Promise<Captcha> {
    const captcha = await this.captchaRepository.findOne({ where: query });
    return captcha;
  }
}
