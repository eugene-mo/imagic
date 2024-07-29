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

  //creating new captcha
  async create(createCaptchaDto: CreateCaptchaDto, checkExist = true): Promise<Captcha> {
    const captchaName = createCaptchaDto.name?.toLowerCase();
    const imageLimit = createCaptchaDto.imageLimit;

    const providerName = createCaptchaDto.captchaProvider?.toLowerCase() || null;
    const sourceServices = createCaptchaDto.sourceServices || null;

    //check if captcha with name 'captchaName' exist  
    var captchaExist;
    if (checkExist) {//if checking is required
      captchaExist = await this.isCaptchaExist({ name: captchaName });
      if (captchaExist) {
        new BadRequestException(`Captcha with name '${captchaName}' already exist!`)
      }
    }

    //check if captcha provider with name 'provider' is exist | if no - create it 
    var captchaProvider;
    if (checkExist && providerName) {
      captchaProvider = await this.captchaProviderService.isCaptchaProviderExist({ name: providerName });
      if (!captchaProvider) {
        captchaProvider = await this.captchaProviderService.create({ name: providerName }, false);
        // new BadRequestException(`Captcha provider with name '${providerName}' not found!`)
      }
    }

    var sourceServicesDB;
    if (checkExist && sourceServices.length) {
      sourceServicesDB = await Promise.all(
        sourceServices.map(async (serviceName) => {
          let service = await this.sourceServiceService.isSourceServiceExist({ name: serviceName });
          if (!service) {
            service = await this.sourceServiceService.create({ name: serviceName });
          }
          return service;
        })
      );
    }

    const newCaptcha = await this.captchaRepository.save({
      name: captchaName,
      imageLimit: imageLimit,
      provider: captchaProvider,
      imageNum: 0,
      sourceServices: sourceServicesDB,
    });

    return newCaptcha;
  }

  async findAll(): Promise<Captcha[]> {
    return await this.captchaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} captcha`;
  }

  async update(id: number, updateCaptchaDto: UpdateCaptchaDto): Promise<Captcha> {
    const captcha = await this.isCaptchaExist({ id });
    if (!captcha) {
      throw new NotFoundException(`Captcha with ID ${id} not found`);
    }

    const { name, captchaProvider, imageLimit } = updateCaptchaDto;

    if (name) {
      captcha.name = name;
    }

    if (imageLimit !== undefined) {
      captcha.imageLimit = imageLimit;
    }

    if (captchaProvider) {
      const provider = await this.captchaProviderService.isCaptchaProviderExist({ name: captchaProvider });
      if (!provider) {
        throw new BadRequestException(`Captcha provider with name '${captchaProvider}' not found`);
      }
      captcha.provider = provider;
    }

    await this.captchaRepository.save(captcha);
    return captcha;
  }

  async pairToService(pairToServiceDto: pairCaptchaToServiceDto): Promise<Captcha> {
    const { captchaName, serviceName } = pairToServiceDto;

    // check is captcha exist 
    const captcha = await this.isCaptchaExist({ name: captchaName });
    if (!captcha) {
      throw new NotFoundException(`Captcha with name '${captchaName}' not found`);
    }

    // check is source service exist
    const service = await this.sourceServiceService.isSourceServiceExist({ name: serviceName });
    if (!service) {
      throw new NotFoundException(`SourceService with name '${serviceName}' not found`);
    }

    // check if pair relationships not exist
    if (captcha.sourceServices.some(existingService => existingService.id === service.id)) {
      throw new BadRequestException(`Captcha '${captchaName}' is already paired with service '${serviceName}'`);
    }
    if (service.captchas.some(existingCaptcha => existingCaptcha.id === captcha.id)) {
      throw new BadRequestException(`Captcha '${captchaName}' is already paired with service '${serviceName}'`);
    }

    // add relationships
    captcha.sourceServices.push(service);
    service.captchas.push(captcha);
    await this.sourceServiceRepository.save(service);
    const updatedCaptcha = await this.captchaRepository.save(captcha);

    return updatedCaptcha;
  }

  async remove(id: number) {
    return await this.captchaRepository.remove([await this.isCaptchaExist({ id })])
  }

  async isCaptchaExist(UpdateCaptchaDto): Promise<Captcha> {
    const captcha = await this.captchaRepository.findOne({ where: UpdateCaptchaDto, relations: ['sourceServices'], });
    if (!captcha) {
      throw new BadRequestException(`captcha '${captcha}' is not found`);
    }
    return captcha;
  }


}
