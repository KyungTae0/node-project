import { Module } from '@nestjs/common';
import { CommentService } from './application/comment.service';
import { CommentController } from './presentation/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { CommentRepositoryImpl } from '@comment/infrastructure/persistence/comment.repository.impl';
import { PostEntity } from '@post/domain/entities/post.entity';
import { PostRepositoryImpl } from '@post/infrastructure/persistence/post.repository.impl';
import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';
import { KeywordAlertRepositoryImpl } from '@keywordAlert/infrastructure/persistence/keywordAlert.repository.impl';
import { KeywordAlertService } from '@keywordAlert/application/keywordAlert.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, PostEntity, KeywordAlertEntity]),
  ],
  controllers: [CommentController],
  providers: [
    CommentRepositoryImpl,
    PostRepositoryImpl,
    CommentService,
    KeywordAlertRepositoryImpl,
    KeywordAlertService,
  ],
})
export class CommentModule {}
