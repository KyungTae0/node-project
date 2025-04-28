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
import { PostService } from '@post/application/post.service';
import { CreatePostInput } from '@post/presentation/dtos/create-post-input.dto';
import { CreatePostOutput } from '@post/presentation/dtos/create-post-output.dto';
import { DeletePostInput } from '@post/presentation/dtos/delete-post.input.dto';
import { GetPostsInput } from '@post/presentation/dtos/get-posts-input.dto';
import { GetPostsOutput } from '@post/presentation/dtos/get-posts-output.dto';
import { UpdatePostInput } from '@post/presentation/dtos/update-post-input.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * @alias 게시글 리스트 조회
   * @example
   * GET /posts?page=1&size=20&author=나경태&title=게시글1
   */
  @Get()
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
   *   "author": "작성자",
   *   "password": "비밀번호"
   * }
   * ```
   */
  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() input: UpdatePostInput) {
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
  async deletePost(@Param('id') id: string, @Body() input: DeletePostInput) {
    return this.postService.deletePost(Number(id), input);
  }
}
