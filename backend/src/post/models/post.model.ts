import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Like } from '../../like/models/like.model';
import { Comment } from '../../comment/models/comment.model';
@ObjectType()
export class Post {
  @Field(() => Int)
  post_id: number;
  @Field(() => Int)
  user_id: number;
  @Field()
  image_url: string;
  @Field({ nullable: true })
  caption: string;
  @Field()
  created_at: Date;

  @Field(() => User)
  user: User;
  @Field(() => [Comment])
  comments: Comment[];
  @Field(() => [Like])
  likes: Like;
}
