import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestStatusService } from './quest-status.service';
import { CreateQuestStatusDto } from './dto/create-quest-status.dto';
import { UpdateQuestStatusDto } from './dto/update-quest-status.dto';

@Controller('quest-status')
export class QuestStatusController {
  constructor(private readonly questStatusService: QuestStatusService) {}

  @Post()
  create(@Body() createQuestStatusDto: CreateQuestStatusDto) {
    return this.questStatusService.create(createQuestStatusDto);
  }

  @Get()
  findAll() {
    return this.questStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestStatusDto: UpdateQuestStatusDto) {
    return this.questStatusService.update(+id, updateQuestStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questStatusService.remove(+id);
  }
}
