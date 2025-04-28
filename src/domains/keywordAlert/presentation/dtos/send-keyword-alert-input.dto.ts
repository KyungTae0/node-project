import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { KeywordAlertTarget } from '@keywordAlert/shared/keyword-alert.enum';
import { PostEntity } from '@post/domain/entities/post.entity';

/**
 * @alias 키워드 알림 요청 Input DTO
 */
export class SendKeywordAlertInput {
  /**
   * @alias 게시글 본문 또는 댓글 내용
   */
  content: string;
  /**
   * @alias 게시글 또는 댓글 Entity 객체
   */
  entity: PostEntity | CommentEntity;
  /**
   * @alias 생성 된 키워드 타입
   */
  target: KeywordAlertTarget;
}
