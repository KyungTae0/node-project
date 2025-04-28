import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { CommentRepositoryImpl } from '@comment/infrastructure/persistence/comment.repository.impl';
import {
  CommentDto,
  GetCommentsOutput,
} from '@comment/presentation/dtos/get-comment-output.dto';
import { GetCommentsInput } from '@comment/presentation/dtos/get-comments-input.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepositoryImpl) {}
  /**
   * @alias 댓글 리스트 검색
   */
  async getComments(input: GetCommentsInput): Promise<GetCommentsOutput> {
    const { postId, page = 1, size = 20 } = input;

    // 게시글이 존재하는지 확인
    const postExists = await this.commentRepository.findOneById(postId);
    if (!postExists) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 댓글 조회
    const [comments, totalCount] =
      await this.commentRepository.findComments(input);

    // 댓글 트리 구조로 변환 (부모 댓글 -> 자식 댓글)
    const commentDtos = this.buildCommentTree(comments);

    return {
      nowPage: page,
      totalPage: Math.ceil(totalCount / size),
      totalCount,
      comments: commentDtos,
    };
  }

  private buildCommentTree(comments: CommentEntity[]): CommentDto[] {
    // 댓글을 ID를 기준으로 매핑하기 위해 Map을 사용
    const commentMap = new Map<number, CommentDto>();

    // 각 댓글을 반복하며 CommentEntity를 CommentDto로 변환하여 Map에 저장
    comments.forEach((comment) => {
      // 댓글 엔티티(CommentEntity)를 DTO(CommentDto)로 변환
      const commentDto: CommentDto = {
        id: comment.id,
        content: comment.content,
        author: comment.author,
        createdAt: comment.createdAt,
        parentCommentId: comment.parentComment
          ? comment.parentComment.id
          : null,
        children: [],
      };

      commentMap.set(comment.id, commentDto);
    });

    // 부모 댓글을 기준으로 대댓글을 트리 구조로 만듦
    const rootComments: CommentDto[] = [];

    // 다시 한 번 댓글 배열을 반복하면서 부모 댓글과 자식 댓글을 트리 구조로 연결
    comments.forEach((comment) => {
      const commentDto = commentMap.get(comment.id);

      // 댓글이 부모 댓글을 가리키는 경우(즉, 대댓글인 경우)
      if (comment.parentComment) {
        const parentDto = commentMap.get(comment.parentComment.id); // 부모 댓글을 가져옴
        parentDto?.children.push(commentDto); // 부모 댓글에 자식 댓글을 추가
      } else {
        // 부모 댓글인 경우, rootComments 배열에 추가
        rootComments.push(commentDto);
      }
    });

    // 트리 구조로 변환된 부모 댓글과 그에 속하는 자식 댓글을 반환
    return rootComments;
  }
}
