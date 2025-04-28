import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetPostsInput {
  /**
   * @alias 페이지
   */
  @Transform((value) => (value ? Number(value) : 1))
  @IsOptional()
  @IsNumberString()
  page?: number = 1;

  /**
   * @alias 페이지 당 표시 수
   */
  @Transform((value) => (value ? Number(value) : 20))
  @IsOptional()
  @IsNumberString()
  size?: number = 20;

  /**
   * @alias 게시글 제목
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * @alias 게시글 작성자
   */
  @IsOptional()
  @IsString()
  author?: string;
}
