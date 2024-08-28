import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { S3Service } from './s3/s3.service';
import { S3Controller } from './s3/s3.controller';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    PostModule,
    S3Module,
  ],
  providers: [S3Service],
  controllers: [S3Controller],
})
export class AppModule {}
