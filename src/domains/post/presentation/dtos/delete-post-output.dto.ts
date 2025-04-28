// src/domains/post/interface/dto/update-post.input.ts
import { CoreOutput } from '@common/dtos/core.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DeletePostOutput extends CoreOutput {
  /**
   * @alias 삭제 된 게시글 ID
   */
  @ApiProperty({
    description: '삭제 된 게시글 ID',
    example: 1,
    required: true,
  })
  id: number;
}
