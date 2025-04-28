import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetPostsInput {
  /**
   * @alias 페이지
   */
  @IsOptional()
  @IsNumberString()
  page?: string = '1';

  /**
   * @alias 페이지 당 표시 수수
   */
  @IsOptional()
  @IsNumberString()
  size?: string = '20';

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
