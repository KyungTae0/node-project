import { Module } from '@nestjs/common';
import { PostService } from './application/post.service';
import { PostController } from './presentation/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@post/domain/entities/post.entity';
import { PostRepositoryImpl } from '@post/infrastructure/persistence/post.repository.impl';
import { KeywordAlertService } from '@keywordAlert/application/keywordAlert.service';
import { KeywordAlertRepositoryImpl } from '@keywordAlert/infrastructure/persistence/keywordAlert.repository.impl';
import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, KeywordAlertEntity])],
  controllers: [PostController],
  providers: [
    KeywordAlertService,
    PostService,
    PostRepositoryImpl,
    KeywordAlertRepositoryImpl,
  ],
})
export class PostModule {}
