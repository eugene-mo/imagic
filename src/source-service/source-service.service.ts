import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSourceServiceDto } from './dto/create-source-service.dto';
import { UpdateSourceServiceDto } from './dto/update-source-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceService } from './entities/source-service.entity';
import { Repository } from 'typeorm';
import { CreateSourceServiceBulkDto } from './dto/create-source-service-bulk.dto';

@Injectable()
export class SourceServiceService {
  constructor(
    @InjectRepository(SourceService)
    private readonly sourceServiceRepository: Repository<SourceService>
  ) { }

  async create(createSourceServiceDto: CreateSourceServiceDto, checkExist = true): Promise<SourceService> {
    console.log('Creating new service')
    const serviceName = createSourceServiceDto.name;
    var sourceServiceExist = null;
    if (checkExist) { sourceServiceExist = await this.isSourceServiceExist({ name: serviceName }) }

    if (sourceServiceExist) {
      throw new BadRequestException(`Source Service with name '${serviceName}' already exist!`)
    } else {
      return await this.sourceServiceRepository.save({
        name: serviceName
      })
    }
  }

  async createMany(createSourceServiceBulkDto: CreateSourceServiceBulkDto, checkExist = true): Promise<SourceService[]> {
    console.log('Creating few services...');
    const createdServices: SourceService[] = [];
    
    for (const name of createSourceServiceBulkDto.names) {
      try {
        const serviceDto = new CreateSourceServiceDto();
        serviceDto.name = name;
        const createdService = await this.create(serviceDto, checkExist);
        createdServices.push(createdService as SourceService);
      } catch (error) {
        if (error instanceof BadRequestException) {
          console.log(`Service with '${name}' is already exist`);
        } else {
          throw error;
        }
      }
    }
    
    return createdServices;
  }

  async findAll(): Promise<SourceService[]> {
    console.log('Getting all services list')
    return await this.sourceServiceRepository.find({
      relations: ['captchas'],//relations: ['provider', 'quests', 'tasks', 'sourceServices'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return await this.sourceServiceRepository.findOne({
      where: { id },
      relations: ['captchas']
    })
  }

  async update(id: number, updateSourceServiceDto: UpdateSourceServiceDto) {
    const serviceExist = this.isSourceServiceExist({ id: id });
    if (serviceExist) {
      return await this.sourceServiceRepository.update(id, updateSourceServiceDto);
    }
    throw new NotFoundException(`Can't UPDATE. Service with id : ${id} was not found!`);
  }

  async remove(id: number) {
    const serviceExist = this.isSourceServiceExist({ id: id });
    if (serviceExist) {
      return await this.sourceServiceRepository.delete(id);
    }
    throw new NotFoundException(`Can't DELETE. Service with id : ${id} was not found!`);
  }

  async isSourceServiceExist(updateSourceServiceDto: UpdateSourceServiceDto): Promise<SourceService> {
    const service = await this.sourceServiceRepository.findOne({ where: updateSourceServiceDto });
    return service;
  }
}
