import { Injectable } from '@nestjs/common';
import { CreateProductionMethodDto } from './dto/create-production-method.dto';
import { UpdateProductionMethodDto } from './dto/update-production-method.dto';

@Injectable()
export class ProductionMethodService {
  create(createProductionMethodDto: CreateProductionMethodDto) {
    return 'This action adds a new productionMethod';
  }

  findAll() {
    return `This action returns all productionMethod`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionMethod`;
  }

  update(id: number, updateProductionMethodDto: UpdateProductionMethodDto) {
    return `This action updates a #${id} productionMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionMethod`;
  }
}
