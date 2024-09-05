import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SourceServiceService } from './source-service.service';
import { CreateSourceServiceDto } from './dto/create-source-service.dto';
import { UpdateSourceServiceDto } from './dto/update-source-service.dto';
import { CreateSourceServiceBulkDto } from './dto/create-source-service-bulk.dto';

@Controller('source-service')
export class SourceServiceController {
  constructor(private readonly sourceServiceService: SourceServiceService) { }

  @Post()
  create(@Body() createSourceServiceDto: CreateSourceServiceDto) {
    return this.sourceServiceService.create(createSourceServiceDto);
  }

  @Post('bulk')
  createMany(@Body() createSourceServiceBulkDto: CreateSourceServiceBulkDto) {
    return this.sourceServiceService.createMany(createSourceServiceBulkDto);
  }

  @Get()
  findAll() {
    return this.sourceServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSourceServiceDto: UpdateSourceServiceDto) {
    return this.sourceServiceService.update(+id, updateSourceServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceServiceService.remove(+id);
  }
}
