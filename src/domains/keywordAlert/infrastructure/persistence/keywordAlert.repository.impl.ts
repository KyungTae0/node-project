import { Injectable } from '@nestjs/common';
        import { Repository } from 'typeorm';
        import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';
        import { KeywordAlertRepository } from '@keywordAlert/domain/repositories/keywordAlert.repository';
        
        @Injectable()
        export class KeywordAlertRepositoryImpl extends Repository<KeywordAlertEntity> implements KeywordAlertRepository { }