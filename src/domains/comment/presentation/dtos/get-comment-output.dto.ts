import { CoreOutput } from '@common/dtos/core.dto';

/**
 * @alias 댓글 하나에 대한 정보
 */
export class CommentDto {
  /**
   * @alias 댓글 ID
   */
  id: number;
  /**
   * @alias 댓글 내용
   */
  content: string;
  /**
   * @alias 댓글 작성자
   */
  author: string;
  /**
   * @alias 댓글 작성 시각
   */
  createdAt: Date;
  /**
   * @alias 부모 댓글 ID (대댓글의 경우)
   */
  parentCommentId: number | null;
  /**
   * @alias 자식 댓글 목록 (대댓글)
   */
  children: CommentDto[];
}

/**
 * @alias 댓글 목록 조회 응답
 */
export class GetCommentsOutput extends CoreOutput {
  /**
   * @alias 현재 페이지 번호
   */
  nowPage: number;
  /**
   * @alias 총 페이지 수
   */
  totalPage: number;
  /**
   * @alias 전체 댓글 수
   */
  totalCount: number;
  /**
   * @alias 댓글 목록
   */
  comments: CommentDto[];
}
