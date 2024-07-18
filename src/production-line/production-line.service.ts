import { Injectable } from '@nestjs/common';
import { CreateProductionLineDto } from './dto/create-production-line.dto';
import { UpdateProductionLineDto } from './dto/update-production-line.dto';

@Injectable()
export class ProductionLineService {
  create(createProductionLineDto: CreateProductionLineDto) {
    return 'This action adds a new productionLine';
  }

  findAll() {
    return `This action returns all productionLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionLine`;
  }

  update(id: number, updateProductionLineDto: UpdateProductionLineDto) {
    return `This action updates a #${id} productionLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionLine`;
  }
}
