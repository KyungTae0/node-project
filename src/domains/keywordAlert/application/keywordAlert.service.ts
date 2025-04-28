import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { KeywordAlertRepositoryImpl } from '@keywordAlert/infrastructure/persistence/keywordAlert.repository.impl';
import { SendKeywordAlertInput } from '@keywordAlert/presentation/dtos/send-keyword-alert-input.dto';
import { TriggerNotificationInput } from '@keywordAlert/presentation/dtos/trigger-notification-input.dto';
import { KeywordAlertTarget } from '@keywordAlert/shared/keyword-alert.enum';
import { Injectable, Logger } from '@nestjs/common';
import { PostEntity } from '@post/domain/entities/post.entity';

@Injectable()
export class KeywordAlertService {
  constructor(
    private readonly keywordAlertRepository: KeywordAlertRepositoryImpl,
  ) {}

  //#region public
  /**
   * @alias 알림을 보내는 함수
   * @description 게시글 또는 댓글에서 내용 추출 후 등록 된 키워드 검색색
   */
  async sendKeywordAlert({
    content,
    entity,
    target,
  }: SendKeywordAlertInput): Promise<void> {
    const alerts = await this.keywordAlertRepository.findAlertsByKeyword(
      // 키워드는 공백 기준 최소 2글자 이상 단위로 쪼개서 보낸다
      this.extractKeywords(content),
    );
    // 해당 키워드가 포함된 알림을 등록한 모든 작성자에게 알림을 보낸다.
    alerts.forEach((alert) => {
      // 게시글일경우
      if (target === KeywordAlertTarget.POST) {
        this.triggerNotification({
          author: alert.author,
          content: `${alert.author} 님, "${(entity as PostEntity).title}" 게시글의 본문에서 키워드 "${alert.keyword}"가 등록되었습니다.`,
        });
        // 댓글일경우
      } else if (target === KeywordAlertTarget.COMMENT) {
        return this.triggerNotification({
          author: alert.author,
          content: `${alert.author} 님, "${(entity as CommentEntity).post.title}" 게시글의 댓글에서 키워드 "${alert.keyword}"가 등록되었습니다.`,
        });
      }
    });
  }
  //#endregion public

  //#region private
  /**
   * @alias 알림 트리거 함수
   * @description 실제 알림은 미구현이기에 Logger.log 로만 처리리
   */
  private triggerNotification({ content, author }: TriggerNotificationInput) {
    // 실제 알림 보내는 로직은 구현되지 않음
    Logger.log(`${author} 에게 알림 전송`);
    Logger.log(content);
  }

  /**
   * @alias 내용에서 키워드 추출
   * @description
   * 1. 띄워쓰기로 분리
   * 2. 2글자 이상인 단어만 추출
   * 3. 중복 제거
   */
  private extractKeywords(content: string): string[] {
    return Array.from(
      new Set(content.split(' ').filter((word) => word.length > 2)),
    );
  }
  //#endregion private
}
