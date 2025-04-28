// src/domains/post/interface/dto/update-post.input.ts
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePostInput {
  /**
   * @alias 제목
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * @alias 본문
   */
  @IsOptional()
  @IsString()
  content?: string;

  /**
   * @alias 비밀번호
   * @description 게시글 수정 시 비밀번호 비교
   */
  @IsString()
  @IsNotEmpty({ message: '게시글 비밀번호는 필수 값입니다.' })
  password: string;
}
