import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/models/post.model';
// import { Comment } from '../../comment/models/comment.model';
// import { Like } from '../../like/models/like.model';
// import { Profile } from '../../profile/models/profile.model';

@ObjectType()
export class User {
  @Field(() => Int)
  user_id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field()
  created_at: Date;

  // @Field(() => Profile, { nullable: true })
  // profile?: Profile;

  // @Field(() => [Post])
  // posts: Post[];

  // @Field(() => [Comment])
  // comments: Comment[];

  // @Field(() => [Like])
  // likes: Like[];

  // @Field(() => [User])
  // followers: User[];

  // @Field(() => [User])
  // following: User[];
}
