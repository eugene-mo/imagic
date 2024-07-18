import { Module } from '@nestjs/common';
import { SourceServiceService } from './source-service.service';
import { SourceServiceController } from './source-service.controller';

@Module({
  controllers: [SourceServiceController],
  providers: [SourceServiceService],
})
export class SourceServiceModule {}
