import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { CommentRepositoryImpl } from '@comment/infrastructure/persistence/comment.repository.impl';
import {
  CommentDto,
  GetCommentsOutput,
} from '@comment/presentation/dtos/get-comment-output.dto';
import { GetCommentsInput } from '@comment/presentation/dtos/get-comments-input.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepositoryImpl) {}
  /**
   * @alias 댓글 리스트 검색
   */
  async getComments({
    postId,
    page,
    size,
  }: GetCommentsInput): Promise<GetCommentsOutput> {
    /**
     * - 댓글 내용
     * - 작성자
     * - 작성일시
     * - 부모 댓글이면 parentCommentId=null
     * - 대댓글이면 parentCommentId 채워짐
     */

    // 댓글 리스트 검색
    const [comments, totalCount] = await this.commentRepository.findComments({
      postId,
      page,
      size,
    });

    // 댓글 + 대댓글 포맷 가공
    const commentDtos = comments.map((comment: CommentEntity) => ({
      id: comment.id,
      content: comment.content,
      author: comment.author,
      createdAt: comment.createdAt,
      // 대댓글인 경우 부모 댓글의 ID를 추가
      parentCommentId: comment.parentComment ? comment.parentComment.id : null,
    }));

    return {
      nowPage: page ?? 1,
      totalPage: Math.ceil(totalCount / (size ?? 10)),
      totalCount,
      comments: commentDtos as CommentDto[],
    };
  }
}
