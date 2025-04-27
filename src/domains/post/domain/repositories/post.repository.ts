import { BaseRepository } from '@common/repositories/base.repository';
import { PostEntity } from '@post/domain/entities/post.entity';

export interface PostRepository extends BaseRepository<PostEntity> {}