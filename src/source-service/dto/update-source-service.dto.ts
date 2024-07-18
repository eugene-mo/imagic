import { PartialType } from '@nestjs/mapped-types';
import { CreateSourceServiceDto } from './create-source-service.dto';

export class UpdateSourceServiceDto extends PartialType(CreateSourceServiceDto) {}
