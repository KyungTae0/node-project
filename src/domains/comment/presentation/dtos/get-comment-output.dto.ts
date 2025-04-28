import { CoreOutput } from '@common/dtos/core.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @alias 댓글 하나에 대한 정보
 */
export class CommentDto {
  /**
   * @alias 댓글 ID
   */
  @ApiProperty({ description: '댓글 ID', example: 1 })
  id: number;

  /**
   * @alias 댓글 내용
   */
  @ApiProperty({ description: '댓글 내용', example: '이것은 댓글입니다.' })
  content: string;

  /**
   * @alias 댓글 작성자
   */
  @ApiProperty({ description: '댓글 작성자', example: 'KyungTae' })
  author: string;

  /**
   * @alias 댓글 작성 시각
   */
  @ApiProperty({
    description: '댓글 작성 시각',
    example: '2025. 4. 28. 오후 2:02:32',
  })
  createdAt: Date;

  /**
   * @alias 부모 댓글 ID (대댓글의 경우)
   */
  @ApiProperty({
    description: '부모 댓글 ID (대댓글의 경우)',
    example: 1,
  })
  parentCommentId: number | null;

  /**
   * @alias 자식 댓글 목록 (대댓글)
   */
  @ApiProperty({
    description: '자식 댓글 목록 (대댓글)',
    example: [],
  })
  children: CommentDto[];
}

/**
 * @alias 댓글 목록 조회 응답
 */
export class GetCommentsOutput extends CoreOutput {
  /**
   * @alias 현재 페이지 번호
   */
  @ApiProperty({ description: '현재 페이지 번호', example: 1 })
  nowPage: number;
  /**
   * @alias 총 페이지 수
   */
  @ApiProperty({ description: '총 페이지 수', example: 1 })
  totalPage: number;
  /**
   * @alias 전체 댓글 수
   */
  @ApiProperty({ description: '전체 댓글 수', example: 2 })
  totalCount: number;
  /**
   * @alias 댓글 목록
   */
  @ApiProperty({
    description: '댓글목록',
    example: [
      {
        id: 1,
        content: '이것은 댓글입니다.',
        author: 'KyungTae',
        createdAt: '2025. 04. 28. 오후 2:02:32Z',
        parentCommentId: null,
        children: [],
      },
      {
        id: 2,
        content: '두 번째 댓글입니다.',
        author: 'KyungTae',
        createdAt: '2025. 04. 28. 오후 3:02:32',
        parentCommentId: 1,
        children: [],
      },
    ],
  })
  comments: CommentDto[];
}
