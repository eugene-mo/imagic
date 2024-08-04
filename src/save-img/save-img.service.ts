import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as sharp from 'sharp';
import { FileSystemStoredFile, MemoryStoredFile } from 'nestjs-form-data';

interface SaveImgOptions {
  data: Buffer | string;
  path: string;
  fileName: string;
  compressQuality?: number;
}

const DEF_IMG_SAVE_PATH = {
  TASK: '../static/task-image',
  ORIGINAL: '../static/original-image'
};

const DEF_COMPRESSION_QUALITY = 100 // no compression

@Injectable()
export class SaveImgService {
  async saveJpgImg(options: SaveImgOptions): Promise<void> {
    const { data, path, fileName, compressQuality = 100 } = options;

    // Ensure directory exists
    await fs.mkdir(path, { recursive: true });

    // Convert data to buffer if it's a base64 string
    const imageData = Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64');

    // Optionally compress the image
    const processedImage = compressQuality != 100
      ? await this.compressJpgImg(imageData, compressQuality)
      : imageData;

    // Write the image to the specified path
    await fs.writeFile(`${path}/${fileName}`, processedImage);
  }

  private async compressJpgImg(imageData: Buffer, quality = DEF_COMPRESSION_QUALITY): Promise<Buffer> {
    try {
      return await sharp(imageData).toFormat('jpeg', { quality }).toBuffer();
    } catch (error) {
      throw new BadRequestException('Failed to compress image');
    }
  }

  async saveQuestOriginalImage({ imgName, imgData, compressQuality = DEF_COMPRESSION_QUALITY }) {
    const buffer = await this.convertToBuffer(imgData);
    return await this.saveJpgImg({
      data: buffer,
      path: DEF_IMG_SAVE_PATH.ORIGINAL,
      fileName: imgName,
      compressQuality
    });
  }

  private async convertToBuffer(file: FileSystemStoredFile): Promise<Buffer> {
    if (file instanceof MemoryStoredFile) {
      return file.buffer;
    } else {
      return fs.readFile(file.path);
    }
  }
}
