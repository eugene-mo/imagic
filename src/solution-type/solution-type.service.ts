import { Injectable } from '@nestjs/common';
import { CreateSolutionTypeDto } from './dto/create-solution-type.dto';
import { UpdateSolutionTypeDto } from './dto/update-solution-type.dto';

@Injectable()
export class SolutionTypeService {
  create(createSolutionTypeDto: CreateSolutionTypeDto) {
    return 'This action adds a new solutionType';
  }

  findAll() {
    return `This action returns all solutionType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solutionType`;
  }

  update(id: number, updateSolutionTypeDto: UpdateSolutionTypeDto) {
    return `This action updates a #${id} solutionType`;
  }

  remove(id: number) {
    return `This action removes a #${id} solutionType`;
  }
}
