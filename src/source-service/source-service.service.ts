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

  async create(createSourceServiceDto: CreateSourceServiceDto): Promise<SourceService | BadRequestException> {
    const serviceName = createSourceServiceDto.name;
    const sourceServiceExist = this.isSourceServiceExist({ name: serviceName })

    if (sourceServiceExist) {
      return new BadRequestException(`Source Service with nae '${serviceName} already exist!`)
    } else {
      return await this.sourceServiceRepository.save({
        name: serviceName
      })
    }
  }

  async findAll(): Promise<SourceService[]> {
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

  async isSourceServiceExist(updateSourceServiceDto): Promise<Boolean | SourceService> {
    const sourceService = await this.sourceServiceRepository.findOne({ where: updateSourceServiceDto });
    if (sourceService) {
      return sourceService;
    } else {
      return false;
    }
  }
}
