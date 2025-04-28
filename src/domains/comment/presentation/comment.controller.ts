import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from '@comment/application/comment.service';
import { GetCommentsOutput } from '@comment/presentation/dtos/get-comment-output.dto';
import { GetCommentsInput } from '@comment/presentation/dtos/get-comments-input.dto';
import { CreateCommentOutput } from '@comment/presentation/dtos/create-comment-output.dto';
import { CreateCommentInput } from '@comment/presentation/dtos/create-comment-input.dto';
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(
    @Query() input: GetCommentsInput,
  ): Promise<GetCommentsOutput> {
    return this.commentService.getComments(input);
  }

  /**
   * @alias 댓글 작성
   * @url /comments?postId=게시글ID
   * @example
   * ```json
   * {
   *    "content": "댓글 내용",
   *    "author": "작성자",
   *    "parentId": 1,
   *    "parentCommentId": 1
   * }
   * ```
   */
  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Body() createCommentInput: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    createCommentInput.postId = Number(postId);
    return this.commentService.createComment(createCommentInput);
  }
}
