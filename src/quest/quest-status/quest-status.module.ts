import { Module } from '@nestjs/common';
import { QuestStatusService } from './quest-status.service';
import { QuestStatusController } from './quest-status.controller';
import { QuestStatus } from './entities/quest-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestStatus])],
  controllers: [QuestStatusController],
  providers: [QuestStatusService],
})
export class QuestStatusModule {}
