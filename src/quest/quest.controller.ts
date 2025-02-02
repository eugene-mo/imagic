import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) { }

  @Post()
  @FormDataRequest()
  async uploadFile(@Body() createQuestDto: CreateQuestDto) {
    return this.questService.createQuest(createQuestDto)
  }

  @Get()
  findAll() {
    return this.questService.findAll();
  }

  // @Get('/status')
  // findAllStatuses(){
  //   return this.q
  // }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestDto: UpdateQuestDto) {
    return this.questService.update(+id, updateQuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questService.remove(+id);
  }
}
