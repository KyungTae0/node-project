import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { CommentRepository } from '@comment/domain/repositories/comment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCommentsInput } from '@comment/presentation/dtos/get-comments-input.dto';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
  ) {}

  /**
   * @alias 지정한 게시글의 댓글 검색
   */
  async findComments(
    input: GetCommentsInput,
  ): Promise<[CommentEntity[], number]> {
    const { postId, page = 1, size = 20 } = input;
    return await this.repository.findAndCount({
      where: {
        post: {
          id: postId,
        },
      },
      relations: ['parentComment'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });
  }
}
