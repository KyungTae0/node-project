import { ApiProperty } from '@nestjs/swagger';

/**
 * @alias 실패 전용 Output Example 용도
 */
export class FailureOutput {
  /**
   * @alias 성공 여부
   */
  @ApiProperty({
    description: '성공 여부',
    example: false,
  })
  success!: boolean;

  /**
   * @alias 에러 메시지
   */
  @ApiProperty({
    description: '에러 메시지',
    example: '에러 메시지',
  })
  error?: string;
}
