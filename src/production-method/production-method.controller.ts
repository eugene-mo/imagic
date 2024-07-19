import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionMethodService } from './production-method.service';
import { CreateProductionMethodDto } from './dto/create-production-method.dto';
import { UpdateProductionMethodDto } from './dto/update-production-method.dto';

@Controller('production-method')
export class ProductionMethodController {
  constructor(private readonly productionMethodService: ProductionMethodService) {}

  @Post()
  create(@Body() createProductionMethodDto: CreateProductionMethodDto) {
    return this.productionMethodService.create(createProductionMethodDto);
  }

  @Get()
  findAll() {
    return this.productionMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionMethodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionMethodDto: UpdateProductionMethodDto) {
    return this.productionMethodService.update(+id, updateProductionMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionMethodService.remove(+id);
  }
}
