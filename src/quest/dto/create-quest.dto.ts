import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsJpgFile } from '../validator/IsJpgFile.validator';
import { OneOfTwoFields } from '../validator/OneOfTwoFileds.validator';

export class CreateQuestDto {
  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsString()
  captcha: string;

  @IsNotEmpty()
  @IsJpgFile({ message: "'questImage' should be jpeg image" })
  questImage: any;

  @IsOptional()
  @IsJpgFile({ message: "'taskImage' should be jpeg image" })
//   @Validate(OneOfTwoFields, ['taskText'])
  taskImage?: any;

  @IsOptional()
  @IsString()
//   @Validate(OneOfTwoFields, ['taskImage'])
  taskText?: string;
}
