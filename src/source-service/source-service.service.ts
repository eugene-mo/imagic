import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSourceServiceDto } from './dto/create-source-service.dto';
import { UpdateSourceServiceDto } from './dto/update-source-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceService } from './entities/source-service.entity';
import { Repository } from 'typeorm';

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
      new BadRequestException(`Source Service with nae '${serviceName} already exist!`)
    } else {
      return await this.sourceServiceRepository.save({
        name: serviceName
      })
    }
  }

  async findAll(): Promise<SourceService[]> {
    console.log('Getting all services list')
    return await this.sourceServiceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} sourceService`;
  }

  update(id: number, updateSourceServiceDto: UpdateSourceServiceDto) {
    return `This action updates a #${id} sourceService`;
  }

  remove(id: number) {
    return `This action removes a #${id} sourceService`;
  }

  async isSourceServiceExist(updateSourceServiceDto): Promise<SourceService> {
    const sourceService = await this.sourceServiceRepository.findOne({ where: updateSourceServiceDto });
    return sourceService;
  }
}
