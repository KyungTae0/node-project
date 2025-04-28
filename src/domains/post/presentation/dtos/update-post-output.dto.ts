// src/domains/post/interface/dto/update-post.input.ts
import { CoreOutput } from '@common/dtos/core.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostOutput extends CoreOutput {
  /**
   * @alias 수정 된 게시글 ID
   */
  @ApiProperty({
    description: '생성 된 게시글 id',
    example: 1,
  })
  id: number;
}
