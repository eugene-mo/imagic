import { PartialType } from '@nestjs/mapped-types';
import { CreateCaptchaProviderDto } from './create-captcha-provider.dto';

export class UpdateCaptchaProviderDto extends PartialType(CreateCaptchaProviderDto) {}
