import { Injectable } from '@nestjs/common';
import { CreateSourceServiceDto } from './dto/create-source-service.dto';
import { UpdateSourceServiceDto } from './dto/update-source-service.dto';

@Injectable()
export class SourceServiceService {
  create(createSourceServiceDto: CreateSourceServiceDto) {
    return 'This action adds a new sourceService';
  }

  findAll() {
    return `This action returns all sourceService`;
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
}
