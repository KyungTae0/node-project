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
   * @description 게시글 또는 댓글에서 내용 추출 후 등록 된 키워드 검색
   */
  async sendKeywordAlert({
    content,
    entity,
    target,
  }: SendKeywordAlertInput): Promise<void> {
    // keywordAlert 테이블에서 등록된 키워드 모두 가져오기
    const alerts = await this.keywordAlertRepository.findAll();

    // 게시글 본문/댓글 내용에 키워드가 포함되어 있는지 확인
    alerts.forEach((alert) => {
      // 게시글일 경우
      if (
        target === KeywordAlertTarget.POST &&
        content.includes(alert.keyword)
      ) {
        this.triggerNotification({
          author: alert.author,
          content: `${alert.author} 님, "${(entity as PostEntity).title}" 게시글의 본문에서 키워드 "${alert.keyword}"가 등록되었습니다.`,
        });
      }
      // 댓글일 경우
      else if (
        target === KeywordAlertTarget.COMMENT &&
        content.includes(alert.keyword)
      ) {
        this.triggerNotification({
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

  //#endregion private
}
