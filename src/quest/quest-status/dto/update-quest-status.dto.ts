import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestStatusDto } from './create-quest-status.dto';

export class UpdateQuestStatusDto extends PartialType(CreateQuestStatusDto) {}
