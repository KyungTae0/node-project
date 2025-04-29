import { FailureOutput } from '@common/dtos/failure.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from '@post/application/post.service';
import { CreatePostInput } from '@post/presentation/dtos/create-post-input.dto';
import { CreatePostOutput } from '@post/presentation/dtos/create-post-output.dto';
import { DeletePostInput } from '@post/presentation/dtos/delete-post-input.dto';
import { DeletePostOutput } from '@post/presentation/dtos/delete-post-output.dto';
import { GetPostsInput } from '@post/presentation/dtos/get-posts-input.dto';
import { GetPostsOutput } from '@post/presentation/dtos/get-posts-output.dto';
import { UpdatePostInput } from '@post/presentation/dtos/update-post-input.dto';
import { UpdatePostOutput } from '@post/presentation/dtos/update-post-output.dto';

@ApiTags('게시글 API')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * @alias 게시글 리스트 조회
   * @example
   * GET /posts?page=1&size=20&author=나경태&title=게시글1
   */
  @Get()
  @ApiOperation({ summary: '게시글 리스트 조회' })
  @ApiResponse({
    status: 200,
    type: GetPostsOutput,
  })
  @ApiBadGatewayResponse({
    type: FailureOutput,
  })
  async getPosts(@Query() input: GetPostsInput): Promise<GetPostsOutput> {
    return this.postService.getPosts(input);
  }

  /**
   * @alias 게시글 생성
   * @example
   * POST /posts
   * ```json
   * {
   *   "title": "게시글 제목",
   *   "content": "게시글 내용",
   *   "author": "작성자",
   *   "password": "비밀번호"
   * }
   * ```
   */
  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiResponse({
    status: 201,
    type: CreatePostOutput,
  })
  @ApiBadGatewayResponse({
    type: FailureOutput,
  })
  async createPost(@Body() input: CreatePostInput): Promise<CreatePostOutput> {
    return this.postService.createPost(input);
  }

  /**
   * @alias 게시글 수정
   * @example
   * PATCH /posts/1
   * ```json
   * {
   *   "title": "게시글 제목",
   *   "content": "게시글 내용",
   *   "password": "비밀번호"
   * }
   * ```
   */
  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({
    status: 201,
    type: UpdatePostOutput,
  })
  @ApiForbiddenResponse({
    type: FailureOutput,
  })
  async updatePost(
    @Param('id') id: string,
    @Body() input: UpdatePostInput,
  ): Promise<UpdatePostOutput> {
    return this.postService.updatePost(Number(id), input);
  }

  /**
   * @alias 게시글 삭제
   * @example
   * DELETE /posts/1
   * ```json
   * {
   *   "password": "비밀번호"
   * }
   * ```
   */
  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({
    status: 200,
    type: DeletePostOutput,
  })
  @ApiForbiddenResponse({
    type: FailureOutput,
  })
  async deletePost(
    @Param('id') id: string,
    @Body() input: DeletePostInput,
  ): Promise<DeletePostOutput> {
    return this.postService.deletePost(Number(id), input);
  }
}
