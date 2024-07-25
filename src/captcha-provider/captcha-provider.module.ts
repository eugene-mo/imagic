import { Module } from '@nestjs/common';
import { CaptchaProviderService } from './captcha-provider.service';
import { CaptchaProviderController } from './captcha-provider.controller';
import { CaptchaProvider } from './entities/captcha-provider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaptchaProvider])
  ],
  controllers: [CaptchaProviderController],
  providers: [CaptchaProviderService],
})
export class CaptchaProviderModule { }
