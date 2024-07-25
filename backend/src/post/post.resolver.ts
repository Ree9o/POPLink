import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post as PostModel } from './models/post.model';
import { CreatePostInput } from './dto/createPost.dto';
import { Post } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostModel], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getPosts(
    @Args('user_id', { type: () => Int }) user_id: number,
  ): Promise<Post[]> {
    return await this.postService.getPosts(user_id);
  }

  @Query(() => [PostModel])
  async getAllPosts(): Promise<Post[]> {
    return await this.postService.getAllPosts();
  }
  @Mutation(() => PostModel)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('createPostInput')
    createPostInput: CreatePostInput,
  ): Promise<Post> {
    return await this.postService.createPost(createPostInput);
  }

  @Mutation(() => PostModel)
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Args('post_id', { type: () => Int }) post_id: number,
  ): Promise<Post> {
    return await this.postService.deletePost(post_id);
  }
}
