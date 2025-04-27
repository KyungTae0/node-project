import { BaseRepository } from '@common/repositories/base.repository';
import { CommentEntity } from '@comment/domain/entities/comment.entity';

export interface CommentRepository extends BaseRepository<CommentEntity> {}
