import { Module } from '@nestjs/common';
import { SourceServiceService } from './source-service.service';
import { SourceServiceController } from './source-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceService } from './entities/source-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SourceService])],
  controllers: [SourceServiceController],
  providers: [SourceServiceService],
  exports: [SourceServiceService]
})
export class SourceServiceModule { }
