// src/common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * @alias global exception filter
 * @description 매번 에러 처리 하기 귀찮으니 global로 관리하자
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 에러메시지 공통 처리
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any)?.response?.message ||
          (exception.getResponse() as any).message ||
          (exception.getResponse() as any)
        : '서버 오류가 발생했습니다.';

    // class-validator 에서 걸러진 에러는 배열로 들어오기에 합쳐줌
    const errorMessage = Array.isArray(message) ? message.join('\n') : message;

    response.status(status).json({
      success: false,
      error: errorMessage,
    });
  }
}
