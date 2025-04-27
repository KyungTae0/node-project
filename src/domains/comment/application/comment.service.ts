import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  async test() {
    return 'comment';
  }
}