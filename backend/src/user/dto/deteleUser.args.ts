import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class DeleteUserArgs {
  @Field(() => Int)
  @IsInt()
  id: number;
}
