// src/domains/post/interface/dto/update-post.input.ts
import { CoreOutput } from '@common/dtos/core.dto';

export class DeletePostOutput extends CoreOutput {
  /**
   * @alias 삭제 된 게시글 ID
   */
  id: number;
}
