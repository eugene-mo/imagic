import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionLineService } from './production-line.service';
import { CreateProductionLineDto } from './dto/create-production-line.dto';
import { UpdateProductionLineDto } from './dto/update-production-line.dto';

@Controller('production-line')
export class ProductionLineController {
  constructor(private readonly productionLineService: ProductionLineService) {}

  @Post()
  create(@Body() createProductionLineDto: CreateProductionLineDto) {
    return this.productionLineService.create(createProductionLineDto);
  }

  @Get()
  findAll() {
    return this.productionLineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionLineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionLineDto: UpdateProductionLineDto) {
    return this.productionLineService.update(+id, updateProductionLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionLineService.remove(+id);
  }
}
