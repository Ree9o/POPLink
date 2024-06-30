import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class DeletePostArgs {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  post_id: number;
}
