import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

/**
 * @alias 댓글 목록 조회 요청
 */
export class GetCommentsInput {
  /**
   * @alias 게시글 ID
   * @description 댓글을 조회할 게시글의 ID
   */
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: '댓글을 조회할 게시글의 ID',
    example: 1,
    required: true,
  })
  postId: number;

  /**
   * @alias 현재 페이지
   * @description 댓글 목록에서 조회할 페이지 번호 (기본값: 1)
   */
  @IsOptional()
  @Transform(({ value }) => Number(value) || 1)
  @ApiProperty({
    description: '현재 페이지 번호',
    example: 1,
    required: false,
  })
  page?: number = 1;

  /**
   * @alias 페이지 당 댓글 수
   * @description 한 페이지에서 조회할 댓글 수 (기본값: 20)
   */
  @IsOptional()
  @Transform(({ value }) => Number(value) || 20)
  @ApiProperty({
    description: '한 페이지에서 조회할 댓글 수',
    example: 20,
    required: false,
  })
  size?: number = 20;
}
