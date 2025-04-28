import { BaseRepository } from '@common/repositories/base.repository';
import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { GetCommentsInput } from '@comment/presentation/dtos/get-comments-input.dto';

export interface CommentRepository extends BaseRepository<CommentEntity> {
  findComments(input: GetCommentsInput): Promise<[CommentEntity[], number]>;
}
