import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KeywordAlertRepository } from '@keywordAlert/domain/repositories/keywordAlert.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@comment/domain/entities/comment.entity';

@Injectable()
export class KeywordAlertRepositoryImpl implements KeywordAlertRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
  ) {}

  findKeyword(input: unknown): Promise<[any[], number]> {
    console.log(input, this.repository);
    return null;
  }
}
