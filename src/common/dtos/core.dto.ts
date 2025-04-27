/**
 * @alias DTO(Data Transfer Object) - 데이터 전송 객체
 */
export class CoreOutput {
  /**
   * @alias 성공 여부
   */
  success!: boolean;

  /**
   * @alias 결과 메시지
   */
  message?: string;

  /**
   * @alias 실패 시 에러 메시지
   */
  error?: string;
}
