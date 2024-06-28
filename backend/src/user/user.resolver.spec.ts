import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UnauthorizedException } from '@nestjs/common';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', async () => {
    const userInput = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      created_at: new Date(),
    };
    jest
      .spyOn(userService, 'createUser')
      .mockImplementation(async () => ({ ...userInput, user_id: 1 }));
    const result = await resolver.createUser(userInput);
    expect(result).toEqual({ ...userInput, user_id: 1 });
  });

  it('should throw an error if unauthorized user tries to get another user', async () => {
    const getUserArgs = { email: 'other@example.com' };
    const context = { req: { user: { email: 'test@example.com' } } };
    await expect(resolver.getUser(getUserArgs, context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
