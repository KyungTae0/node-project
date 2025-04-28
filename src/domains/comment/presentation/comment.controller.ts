import { Controller, Get, Query } from '@nestjs/common';
import { CommentService } from '@comment/application/comment.service';
import { GetCommentsOutput } from '@comment/presentation/dtos/get-comment-output.dto';
import { GetCommentsInput } from '@comment/presentation/dtos/get-comments-input.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(
    @Query() input: GetCommentsInput,
  ): Promise<GetCommentsOutput> {
    return this.commentService.getComments(input);
  }
}
