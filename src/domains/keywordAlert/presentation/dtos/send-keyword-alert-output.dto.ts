/**
 * @alias 키워드 알림 응답 DTO
 * @description 서버에서 클라이언트로 반환되는 키워드 알림 등록 결과
 */
export class KeywordAlertOutput {
  /**
   * @alias 키워드 알림 ID
   */
  id: number;

  /**
   * @alias 작성자 이름
   */
  author: string;

  /**
   * @alias 알림 키워드
   */
  keyword: string;
}
