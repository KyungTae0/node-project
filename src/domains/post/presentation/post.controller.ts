import { Controller, Get } from '@nestjs/common';
import { PostService } from '@post/application/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async test() {
    return await this.postService.test();
  }
}