import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionTypeService } from './solution-type.service';
import { CreateSolutionTypeDto } from './dto/create-solution-type.dto';
import { UpdateSolutionTypeDto } from './dto/update-solution-type.dto';

@Controller('solution-type')
export class SolutionTypeController {
  constructor(private readonly solutionTypeService: SolutionTypeService) {}

  @Post()
  create(@Body() createSolutionTypeDto: CreateSolutionTypeDto) {
    return this.solutionTypeService.create(createSolutionTypeDto);
  }

  @Get()
  findAll() {
    return this.solutionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionTypeDto: UpdateSolutionTypeDto) {
    return this.solutionTypeService.update(+id, updateSolutionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionTypeService.remove(+id);
  }
}
