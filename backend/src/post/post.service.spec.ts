import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/createPost.dto';

describe('PostService', () => {
  let service: PostService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: {
            post: {
              create: jest.fn().mockResolvedValue({
                user_id: 1,
                post_id: 1,
                image_url: 'https://example.com',
                caption: 'https://example.com',
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can create post', async () => {
    const createPostInput: CreatePostInput = {
      user_id: 1,
      image_url: 'https://example.com',
      caption: 'example text',
    };
    const post = await service.createPost(createPostInput);
    expect(prismaService.post.create).toHaveBeenCalledWith({
      data: {
        user_id: 1,
        caption: 'https://example.com',
        image_url: 'https://example.com',
      },
    });
    expect(post).toBeDefined();
    expect(post.post_id).toBe(1);
  });
});
