import { Module } from '@nestjs/common';
import { SaveImgController } from './save-img.controller';
import { SaveImgService } from './save-img.service';

@Module({
  controllers: [SaveImgController],
  providers: [SaveImgService],
  exports:[SaveImgService]
})
export class SaveImgModule {}
