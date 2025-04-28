import { CoreOutput } from '@common/dtos/core.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostSummaryDto {
  /**
   * @alias 게시글 id
   */
  id: number;
  /**
   * @alias 게시글 제목
   */
  title: string;
  /**
   * @alias 게시글 작성자
   */
  author: string;
  /**
   * @alias 게시글 생성일자
   */
  createdAt: Date;
  /**
   * @alias 게시글 수정일자
   */
  updatedAt: Date;
}

export class GetPostsOutput extends CoreOutput {
  /**
   * @alias 현재 페이지
   */
  @ApiProperty({
    description: '현재 페이지',
    example: 1,
  })
  nowPage: number;
  /**
   * @alias 전체 페이지 수
   */
  @ApiProperty({
    description: '전체 페이지 수',
    example: 1,
  })
  totalPage: number;
  /**
   * @alias 검색 된 게시글 수
   */
  @ApiProperty({
    description: '검색 된 게시글 수',
    example: 2,
  })
  totalCount: number;
  /**
   * @alias 게시판 리스트 페이지에 노출 해줄 게시글 정보
   */
  @ApiProperty({
    description: '게시판 리스트 페이지에 노출 해줄 게시글 정보',
    example: [
      {
        id: 1,
        title: '게시글 제목',
        author: '작성자 이름',
        createdAt: '2025. 2. 3. 오후 3:00',
        updatedAt: '2025. 2. 3. 오후 3:00',
      },
      {
        id: 2,
        title: '게시글 제목2',
        author: '작성자 이름2',
        createdAt: '2025. 2. 3. 오후 4:00',
        updatedAt: '2025. 2. 3. 오후 5:00',
      },
    ],
  })
  posts: PostSummaryDto[];
}
