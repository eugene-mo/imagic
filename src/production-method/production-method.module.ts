import { Module } from '@nestjs/common';
import { ProductionMethodService } from './production-method.service';
import { ProductionMethodController } from './production-method.controller';

@Module({
  controllers: [ProductionMethodController],
  providers: [ProductionMethodService],
})
export class ProductionMethodModule {}
