import { Injectable } from '@nestjs/common';
import { CreateCaptchaProviderDto } from './dto/create-captcha-provider.dto';
import { UpdateCaptchaProviderDto } from './dto/update-captcha-provider.dto';

@Injectable()
export class CaptchaProviderService {
  create(createCaptchaProviderDto: CreateCaptchaProviderDto) {
    return 'This action adds a new captchaProvider';
  }

  findAll() {
    return `This action returns all captchaProvider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} captchaProvider`;
  }

  update(id: number, updateCaptchaProviderDto: UpdateCaptchaProviderDto) {
    return `This action updates a #${id} captchaProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} captchaProvider`;
  }
}
