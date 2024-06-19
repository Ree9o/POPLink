import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { User as UserModel } from './models/user.model';
import { CreateUserInput } from './dto/createUser.dto';
import { GetUserArgs } from './dto/getUser.args';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteUserArgs } from './dto/deteleUser.args';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Args() getUserArgs: GetUserArgs,
    @Context() context: any,
  ): Promise<User> {
    const req = context.req; // HTTPリクエストを直接取得
    const userRequestingEmail = req.user.email;
    if (userRequestingEmail !== getUserArgs.email) {
      throw new UnauthorizedException('You can only get your own account.');
    }
    return await this.userService.getUser(getUserArgs.email);
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Args() deleteUserArgs: DeleteUserArgs,
    @Context() context: any,
  ): Promise<User> {
    const req = context.req; // HTTPリクエストを直接取得
    const userRequestingId = req.user.id; // JWTからユーザーIDを取得
    if (userRequestingId !== deleteUserArgs.id) {
      throw new UnauthorizedException('You can only delete your own account.');
    }
    return await this.userService.deleteUser(deleteUserArgs.id);
  }
}
