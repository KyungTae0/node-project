import { Injectable } from '@nestjs/common';

@Injectable()
export class KeywordAlertService {
  async test() {
    return 'keywordalert';
  }
}