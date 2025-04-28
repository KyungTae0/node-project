import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

/**
 * @alias 댓글 목록 조회 요청
 */
export class GetCommentsInput {
  /**
   * @alias 게시글 ID
   */
  @IsNumber()
  @Transform(({ value }) => Number(value))
  postId: number;

  /**
   * @alias 현재 페이지
   */
  @IsOptional()
  @Transform(({ value }) => Number(value) || 1)
  page?: number = 1;

  /**
   * @alias 페이지 당 댓글 수
   */
  @IsOptional()
  @Transform(({ value }) => Number(value) || 20)
  size?: number = 20;
}
