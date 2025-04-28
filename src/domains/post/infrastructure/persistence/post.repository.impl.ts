import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { PostEntity } from '@post/domain/entities/post.entity';
import { PostRepository } from '@post/domain/repositories/post.repository';
import { GetPostsInput } from '@post/presentation/dtos/get-posts-input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from '@post/presentation/dtos/create-post-input.dto';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
  ) {}

  /**
   * @alias 게시글 리스트 검색
   */
  async findPosts(input: GetPostsInput): Promise<[PostEntity[], number]> {
    const where: FindOptionsWhere<PostEntity> = {};

    if (input.title) {
      where.title = Like(`%${input.title}%`);
    }
    if (input.author) {
      where.author = Like(`%${input.author}%`);
    }

    return this.repository.findAndCount({
      select: ['id', 'title', 'author', 'createdAt', 'updatedAt'],
      where,
      order: { createdAt: 'DESC' },
      skip: (Number(input.page) - 1) * Number(input.size),
      take: Number(input.size),
    });
  }

  /**
   * @alias 게시글 생성
   */
  async createPost(input: CreatePostInput): Promise<PostEntity> {
    const post = this.repository.create({
      title: input.title,
      content: input.content,
      author: input.author,
      password: input.password,
    });

    return this.repository.save(post);
  }

  /**
   * @alias 게시글 ID로 게시글 여러건 조회
   */
  async findById(id: number): Promise<PostEntity[] | null> {
    return this.repository.findBy({ id });
  }

  /**
   * @alias 게시글 ID로 게시글 단건 조회
   */
  async findOneById(id: number): Promise<PostEntity | null> {
    return this.repository.findOneBy({ id });
  }

  /**
   * @alias 게시글 수정
   */
  async updatePost(
    id: number,
    input: Partial<PostEntity>,
  ): Promise<PostEntity> {
    await this.repository.update(id, input);
    return this.findOneById(id);
  }

  /**
   * @alias 게시글 삭제
   */
  async deletePost(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
