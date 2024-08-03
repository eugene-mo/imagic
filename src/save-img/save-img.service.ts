import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as sharp from 'sharp';

interface SaveImgOptions {
  data: Buffer | string;
  path: string;
  fileName: string;
  tryToCompress?: boolean;
}

const DEF_IMG_SAVE_PATH = {
  TASK: '../static/task-image',
  ORIGINAL: '../static/original-image'
}
@Injectable()
export class SaveImgService {
  async saveJpgImg(options: SaveImgOptions): Promise<void> {
    const { data, path, fileName, tryToCompress = false } = options;

    // Ensure directory exists
    await fs.mkdir(path, { recursive: true });

    // Convert data to buffer if it's a base64 string
    const imageData = Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64');

    // Optionally compress the image
    const processedImage = tryToCompress
      ? await this.compressJpgImg(imageData)
      : imageData;

    // Write the image to the specified path
    await fs.writeFile(`${path}/${fileName}`, processedImage);
  }

  private async compressJpgImg(imageData: Buffer, quality = 80): Promise<Buffer> {
    try {
      return await sharp(imageData).toFormat('jpeg', { quality }).toBuffer();
    } catch (error) {
      throw new BadRequestException('Failed to compress image');
    }
  }

  async saveQuestOriginalImage({ imgName, imgData, tryToCompress = false }) {
    return await this.saveJpgImg({
      data: imgData,
      path: DEF_IMG_SAVE_PATH.ORIGINAL,
      fileName: imgName,
      tryToCompress
    })
  }
}
