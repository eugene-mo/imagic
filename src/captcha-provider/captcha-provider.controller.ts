import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaptchaProviderService } from './captcha-provider.service';
import { CreateCaptchaProviderDto } from './dto/create-captcha-provider.dto';
import { UpdateCaptchaProviderDto } from './dto/update-captcha-provider.dto';

@Controller('captcha-provider')
export class CaptchaProviderController {
  constructor(private readonly captchaProviderService: CaptchaProviderService) {}

  @Post()
  create(@Body() createCaptchaProviderDto: CreateCaptchaProviderDto) {
    return this.captchaProviderService.create(createCaptchaProviderDto);
  }

  @Get()
  findAll() {
    return this.captchaProviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.captchaProviderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaptchaProviderDto: UpdateCaptchaProviderDto) {
    return this.captchaProviderService.update(+id, updateCaptchaProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.captchaProviderService.remove(+id);
  }
}
