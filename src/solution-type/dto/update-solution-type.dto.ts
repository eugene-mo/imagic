import { PartialType } from '@nestjs/mapped-types';
import { CreateSolutionTypeDto } from './create-solution-type.dto';

export class UpdateSolutionTypeDto extends PartialType(CreateSolutionTypeDto) {}
