// src/domains/post/interface/dto/update-post.input.ts
import { CoreOutput } from '@common/dtos/core.dto';

export class UpdatePostOutput extends CoreOutput {
  /**
   * @alias 수정 된 게시글 ID
   */
  id: number;
}
