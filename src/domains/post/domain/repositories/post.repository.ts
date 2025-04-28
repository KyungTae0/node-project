import { BaseRepository } from '@common/repositories/base.repository';
import { PostEntity } from '@post/domain/entities/post.entity';
import { CreatePostInput } from '@post/presentation/dtos/create-post-input.dto';
import { GetPostsInput } from '@post/presentation/dtos/get-posts-input.dto';

export interface PostRepository extends BaseRepository<PostEntity> {
  findPosts(input: GetPostsInput): Promise<[PostEntity[], number]>;
  createPost(input: CreatePostInput): Promise<PostEntity>;
  updatePost(id: number, input: Partial<PostEntity>): Promise<PostEntity>;
}
