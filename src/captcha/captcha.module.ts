import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Captcha } from './entities/captcha.entity';
import { CaptchaProvider } from 'src/captcha-provider/entities/captcha-provider.entity';
import { CaptchaProviderService } from 'src/captcha-provider/captcha-provider.service';

@Module({
  imports: [TypeOrmModule.forFeature([Captcha, CaptchaProvider])],
  controllers: [CaptchaController],
  providers: [CaptchaService, CaptchaProviderService],
})
export class CaptchaModule { }
