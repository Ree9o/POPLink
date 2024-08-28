import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class CreateImageRequest {
  @Field()
  @IsString()
  bucketName: string;
  @Field()
  @IsString()
  key: string;
  @Field()
  @IsString()
  url: string;
}
