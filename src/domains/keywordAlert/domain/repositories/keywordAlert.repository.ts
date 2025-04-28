import { BaseRepository } from '@common/repositories/base.repository';
import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';

export interface KeywordAlertRepository
  extends BaseRepository<KeywordAlertEntity> {
  findKeyword(input: any): Promise<[any[], number]>;
}
