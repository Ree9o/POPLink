import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { S3 } from 'aws-sdk';
@Injectable()
export class S3Service {
  state = uuid();
  async upload(file: Express.Multer.File) {
    const { originalname } = file;
    const fileName = `${this.state}-${originalname}`;
    const s3 = new S3();
    const params = {
      Bucket: 'poplink-bucket',
      Key: fileName,
      Body: file.buffer,
    };

    try {
      const result = await s3.upload(params).promise();
      return result;
    } catch (error) {
      throw new Error(`S3アップロードエラー: ${error.message}`);
    }
  }
}
