import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async test() {
    return 'post';
  }
}