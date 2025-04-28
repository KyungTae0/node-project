import { CoreOutput } from '@common/dtos/core.dto';

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
  nowPage: number;
  /**
   * @alias 전체 페이지 수
   */
  totalPage: number;
  /**
   * @alias 검색 된 게시글 수
   */
  totalCount: number;
  /**
   * @alias 게시판 리스트 페이지에 노출 해줄 게시글 정보
   */
  posts: PostSummaryDto[];
}
