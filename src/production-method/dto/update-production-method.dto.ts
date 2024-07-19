import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionMethodDto } from './create-production-method.dto';

export class UpdateProductionMethodDto extends PartialType(CreateProductionMethodDto) {}
