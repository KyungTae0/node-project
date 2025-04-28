// src/domains/post/interface/dto/update-post.input.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePostInput {
  /**
   * @alias 제목
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
   * @alias 본문
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '게시글 본문',
    example: '게시글 본문 123',
    required: false,
  })
  content?: string;

  /**
   * @alias 비밀번호
   * @description 게시글 수정 시 비밀번호 비교
   */
  @IsString()
  @IsNotEmpty({ message: '게시글 비밀번호는 필수 값입니다.' })
  @ApiProperty({
    description: '게시글 비밀번호',
    example: '1234',
    required: true,
  })
  password: string;
}
