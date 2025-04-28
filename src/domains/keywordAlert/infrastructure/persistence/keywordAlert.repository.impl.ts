import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { KeywordAlertRepository } from '@keywordAlert/domain/repositories/keywordAlert.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';

@Injectable()
export class KeywordAlertRepositoryImpl implements KeywordAlertRepository {
  constructor(
    @InjectRepository(KeywordAlertEntity)
    private readonly repository: Repository<KeywordAlertEntity>,
  ) {}

  /**
   * @alias 키워드 알림 조회
   * @description 주어진 내용에서 키워드가 포함된 알림을 찾는 메서드
   */
  async findAlertsByKeyword(content: string[]): Promise<KeywordAlertEntity[]> {
    // 키워드가 포함된 알림을 찾기
    return this.repository.find({
      select: ['id', 'keyword', 'author'],
      where: { keyword: In(content) },
    });
  }
}
