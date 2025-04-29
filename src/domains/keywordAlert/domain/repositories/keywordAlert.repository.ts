import { BaseRepository } from '@common/repositories/base.repository';
import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';

export interface KeywordAlertRepository
  extends BaseRepository<KeywordAlertEntity> {
  findAlertsByKeyword(content: string[]): Promise<KeywordAlertEntity[]>;
  findAll(): Promise<KeywordAlertEntity[]>;
}
