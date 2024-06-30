import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUrl,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  user_id: number;
  @Field()
  @IsNotEmpty()
  @IsUrl()
  image_url: string;
  @Field({ nullable: true })
  @MaxLength(144)
  caption: string;
}
