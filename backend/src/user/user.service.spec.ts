import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.dto';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    // TestingModuleを作成し、テストに必要なプロバイダを設定します。
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, // UserServiceをプロバイダとして登録
        {
          provide: PrismaService, // PrismaServiceの代わりにモックを提供
          useValue: {
            user: {
              // userオブジェクトのfindUniqueメソッドをモック
              findUnique: jest.fn().mockResolvedValue({
                email: 'test@example.com', // モックが返す固定のemail
                username: 'testuser', // モックが返す固定のusername
                user_id: 1, // モックが返す固定のid
              }),
              // userオブジェクトのcreateメソッドをモック
              create: jest.fn().mockResolvedValue({
                user_id: 1,
                username: 'newuser',
                email: 'newuser@example.com',
                password: 'hashedpassword',
              }),
              delete: jest.fn().mockResolvedValue({
                user_id: 1,
                email: 'test@example.com',
              }),
            },
          },
        },
      ],
    }).compile();

    // モジュールからUserServiceとPrismaServiceのインスタンスを取得
    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get user', async () => {
    const email = 'test@example.com';
    // UserServiceのgetUserメソッドをテスト
    const user = await service.getUser(email);
    expect(user).toBeDefined(); // userが定義されていることを確認
    expect(user.email).toBe(email); // emailが期待した値であることを確認
    expect(user.username).toBe('testuser'); // usernameが期待した値であることを確認
    // PrismaServiceのfindUniqueが適切な引数で呼ばれたかを確認
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
  });

  it('can create user', async () => {
    const createUserInput: CreateUserInput = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
    };

    const createdUser = await service.createUser(createUserInput);
    expect(createdUser).toBeDefined();
    expect(createdUser.user_id).toBe(1);
    expect(createdUser.username).toBe('newuser');
    expect(createdUser.email).toBe('newuser@example.com');
    // パスワードはハッシュ化されるため、直接の比較は行わない
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        username: createUserInput.username,
        email: createUserInput.email,
        password: expect.any(String), // ハッシュ化されたパスワードが期待される
      },
    });
  });
  it('can delete user', async () => {
    const email = 'test@example.com';
    const user = await service.getUser(email);
    const { user_id } = user;
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user_id).toBe(1);

    await service.deleteUser(user_id);
    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { user_id },
    });
  });
});
