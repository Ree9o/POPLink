import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaservice: PrismaService) {}

  async createPost(createPostInput: CreatePostInput) {
    const { user_id, image_url, caption } = createPostInput;
    return await this.prismaservice.post.create({
      data: {
        user_id,
        image_url,
        caption,
      },
    });
  }

  async deletePost(post_id: number) {
    return await this.prismaservice.post.delete({
      where: { post_id },
    });
  }
}
