import { Controller, Get } from '@nestjs/common';
import { KeywordAlertService } from '@keywordAlert/application/keywordAlert.service';

@Controller('keywordalert')
export class KeywordAlertController {
  constructor(private readonly keywordAlertService: KeywordAlertService) {}

  @Get()
  async test() {
    return await this.keywordAlertService.test();
  }
}