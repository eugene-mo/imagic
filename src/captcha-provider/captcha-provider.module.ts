import { Module } from '@nestjs/common';
import { CaptchaProviderService } from './captcha-provider.service';
import { CaptchaProviderController } from './captcha-provider.controller';

@Module({
  controllers: [CaptchaProviderController],
  providers: [CaptchaProviderService],
})
export class CaptchaProviderModule {}
