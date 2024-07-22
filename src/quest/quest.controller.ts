import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { UploadInterceptor } from 'src/_global/upload/upload.interceptor';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) { }

  @Post()
  @UseInterceptors(FileInterceptor('questImage', {
    storage: diskStorage({
      destination: './static/original-image/',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const createQuestDto = plainToInstance(CreateQuestDto, { ...body, questImage: file });

    const errors = await validate(createQuestDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    console.log(file);
    console.log(body);
    return { message: 'File uploaded successfully!', file, body };
  }

  @Get()
  findAll() {
    return this.questService.findAll();
  }

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
