// src/domains/post/interface/dto/delete-post.input.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePostInput {
  /**
   * @alias 비밀번호
   * @description 게시글 삭제 시 비밀번호 검사사
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
