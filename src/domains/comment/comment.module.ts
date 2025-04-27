import { Module } from '@nestjs/common';
import { CommentService } from './application/comment.service';
import { CommentController } from './presentation/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@comment/domain/entities/comment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
