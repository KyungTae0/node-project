import { Module } from '@nestjs/common';
import { KeywordAlertService } from './application/keywordAlert.service';
import { KeywordAlertController } from './presentation/keywordAlert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';
import { KeywordAlertRepositoryImpl } from '@keywordAlert/infrastructure/persistence/keywordAlert.repository.impl';
@Module({
  imports: [TypeOrmModule.forFeature([KeywordAlertEntity])],
  controllers: [KeywordAlertController],
  providers: [KeywordAlertRepositoryImpl, KeywordAlertService],
})
export class KeywordAlertModule {}
