import { CoreOutput } from '@common/dtos/core.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostOutput extends CoreOutput {
  /**
   * @alias 생성 된 게시글 id
   */
  @ApiProperty({
    description: '생성 된 게시글 id',
    example: 1,
  })
  id: number;
}
