import { Module } from '@nestjs/common';
import { CommentService } from './application/comment.service';
import { CommentController } from './presentation/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { CommentRepositoryImpl } from '@comment/infrastructure/persistence/comment.repository.impl';
@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentController],
  providers: [CommentRepositoryImpl, CommentService],
})
export class CommentModule {}
