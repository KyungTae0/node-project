import { Injectable } from '@nestjs/common';
        import { Repository } from 'typeorm';
        import { CommentEntity } from '@comment/domain/entities/comment.entity';
        import { CommentRepository } from '@comment/domain/repositories/comment.repository';
        
        @Injectable()
        export class CommentRepositoryImpl extends Repository<CommentEntity> implements CommentRepository { }