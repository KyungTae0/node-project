import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
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
   * @alias 지정한 게시글의 댓글 목록 조회
   */
  async findComments(
    input: GetCommentsInput,
  ): Promise<[CommentEntity[], number]> {
    const { postId, page = 1, size = 10 } = input;
    const where: FindOptionsWhere<CommentEntity> = { post: { id: postId } };

    return this.repository.findAndCount({
      where,
      relations: ['parentComment', 'childrenComment'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });
  }

  /**
   * @alias 댓글 생성
   */
  async save(input: CommentEntity): Promise<CommentEntity> {
    return this.repository.save(input);
  }

  /**
   * @alias 댓글 ID로 댓글 조회
   */
  async findOneById(id: number): Promise<CommentEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['parentComment', 'childrenComment'],
    });
  }

  /**
   * @alias 댓글 수정
   */
  async updateComment(
    id: number,
    input: Partial<CommentEntity>,
  ): Promise<CommentEntity> {
    await this.repository.update(id, input);
    return this.findOneById(id);
  }

  /**
   * @alias 댓글 삭제
   */
  async deleteComment(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
