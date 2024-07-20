import { Module } from '@nestjs/common';
import { SolutionTypeService } from './solution-type.service';
import { SolutionTypeController } from './solution-type.controller';

@Module({
  controllers: [SolutionTypeController],
  providers: [SolutionTypeService],
})
export class SolutionTypeModule {}
