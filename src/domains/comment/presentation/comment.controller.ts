import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from '@comment/application/comment.service';
import { GetCommentsOutput } from '@comment/presentation/dtos/get-comment-output.dto';
import { GetCommentsInput } from '@comment/presentation/dtos/get-comments-input.dto';
import { CreateCommentOutput } from '@comment/presentation/dtos/create-comment-output.dto';
import { CreateCommentInput } from '@comment/presentation/dtos/create-comment-input.dto';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FailureOutput } from '@common/dtos/failure.dto';
@ApiTags('댓글 API')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * @alias 댓글 리스트 조회
   * @url /comments?postId=1&page=1&size=20
   */
  @Get()
  @ApiOperation({ summary: '댓글 리스트 조회' })
  @ApiResponse({
    status: 200,
    type: GetCommentsOutput,
  })
  @ApiNotFoundResponse({
    type: FailureOutput,
  })
  async getComments(
    @Query() input: GetCommentsInput,
  ): Promise<GetCommentsOutput> {
    return this.commentService.getComments(input);
  }

  /**
   * @alias 댓글 작성
   * @url /comments?postId=1
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
  @ApiOperation({ summary: '댓글 작성' })
  @ApiResponse({
    status: 201,
    type: CreateCommentOutput,
  })
  @ApiNotFoundResponse({
    type: FailureOutput,
  })
  async createComment(
    @Param('postId') postId: number,
    @Body() createCommentInput: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    createCommentInput.postId = Number(postId);
    return this.commentService.createComment(createCommentInput);
  }
}
