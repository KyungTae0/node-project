import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class GetPostsInput {
  /**
   * @alias 페이지
   */
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '현재 페이지 번호',
    example: 1,
    required: false,
  })
  page?: number = 1;

  /**
   * @alias 페이지 당 표시 수
   */
  @Transform(({ value }) => (value ? Number(value) : 20))
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '한 페이지에서 조회할 댓글 수',
    example: 20,
    required: false,
  })
  size?: number = 20;

  /**
   * @alias 게시글 제목
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목 123',
    required: false,
  })
  title?: string;

  /**
   * @alias 게시글 작성자
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '작성자',
    example: 'KyungTae',
    required: false,
  })
  author?: string;
}
