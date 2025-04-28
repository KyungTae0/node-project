import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @alias 댓글 작성 요청 Input DTO
 */
export class CreateCommentInput {
  /**
   * @alias 댓글 내용
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 내용',
    example: '이것은 댓글입니다.',
    required: true,
  })
  content: string;

  /**
   * @alias 댓글 작성자
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 작성자',
    example: 'KyungTae',
    required: true,
  })
  author: string;

  /**
   * @alias 부모 댓글 ID
   * @description 대댓글인 경우 부모 댓글 ID, 아니면 null
   */
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: '대댓글인 경우 부모 댓글 ID, 아니면 null',
    example: null,
    required: false,
  })
  parentCommentId?: number | null;

  /**
   * @alias 게시글 ID
   */
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글이 달릴 게시글 ID',
    example: 1,
    required: true,
  })
  postId: number;
}
