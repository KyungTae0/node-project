import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostInput {
  /**
   * @alias 게시글 제목
   */
  @IsString()
  @IsNotEmpty({ message: '게시글 제목은 필수 값입니다.' })
  title: string;

  /**
   * @alias 게시글 본문
   */
  @IsString()
  @IsNotEmpty({ message: '게시글 본문은 필수 값입니다.' })
  content: string;

  /**
   * @alias 게시글 작성자
   * @description 로그인 없는 익명 게시판이라 작성자도 받음
   */
  @IsString()
  @IsNotEmpty({ message: '게시글 작성자명은 필수 값입니다.' })
  author: string;

  /**
   * @alias 게시글 비밀번호
   */
  @IsString()
  @IsNotEmpty({ message: '게시글 비밀번호는 필수 값입니다.' })
  password: string;
}
