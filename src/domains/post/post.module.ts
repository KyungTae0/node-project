import { Module } from '@nestjs/common';
import { PostService } from './application/post.service';
import { PostController } from './presentation/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@post/domain/entities/post.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
