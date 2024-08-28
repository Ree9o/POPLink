import {
  Controller,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageRequest } from './dto/createImageRequest.dto';
import { LogService } from '../log/log.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() createImageRequest: CreateImageRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.s3Service
      .upload(file)
      .then((data: any) => {
        return {
          path: data?.Location as string,
        };
      })
      .catch((e) => {
        if (e instanceof HttpException) {
          console.error(`エラー ${e.getStatus()}: ${e.message}`);
          throw e;
        } else {
          console.error('内部サーバーエラー:', e);
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      });
  }
}
