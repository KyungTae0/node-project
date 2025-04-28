import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @alias 댓글 작성 요청 Input DTO
 */
export class CreateCommentInput {
  /**
   * @alias 댓글 내용
   */
  @IsString()
  @IsNotEmpty()
  content: string;

  /**
   * @alias 댓글 작성자
   */
  @IsString()
  @IsNotEmpty()
  author: string;

  /**
   * @alias 부모 댓글 ID
   * @description 대댓글인 경우 부모 댓글 ID, 아니면 null
   */
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  parentCommentId?: number | null;

  /**
   * @alias 게시글 ID
   */
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
