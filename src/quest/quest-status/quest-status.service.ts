import { Injectable } from '@nestjs/common';
import { CreateQuestStatusDto } from './dto/create-quest-status.dto';
import { UpdateQuestStatusDto } from './dto/update-quest-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestStatus } from './entities/quest-status.entity';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { Repository } from 'typeorm';

@Injectable()
export class QuestStatusService {
  constructor(
    @InjectRepository(QuestStatus)
    private readonly questStatusRepository: Repository<QuestStatus>
  ) { }

  create(createQuestStatusDto: CreateQuestStatusDto) {
    return 'This action adds a new questStatus';
  }

  findAll() {
    return `This action returns all questStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questStatus`;
  }

  update(id: number, updateQuestStatusDto: UpdateQuestStatusDto) {
    return `This action updates a #${id} questStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} questStatus`;
  }

  async isQuestStatusExist(updateTaskDto: UpdateTaskDto) {

  }
}
