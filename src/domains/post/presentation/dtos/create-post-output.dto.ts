import { CoreOutput } from '@common/dtos/core.dto';

export class CreatePostOutput extends CoreOutput {
  /**
   * @alias 생성 된 게시글 id
   */
  id: number;
}
