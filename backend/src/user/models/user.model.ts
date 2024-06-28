import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  user_id: number;
  @Field()
  username: string;
  @Field()
  email: string;
  @HideField() // client（gql）から取得できなくする
  password: string;
  @Field()
  created_at: Date;
}
