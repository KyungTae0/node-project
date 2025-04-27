import { Injectable } from '@nestjs/common';
        import { Repository } from 'typeorm';
        import { PostEntity } from '@post/domain/entities/post.entity';
        import { PostRepository } from '@post/domain/repositories/post.repository';
        
        @Injectable()
        export class PostRepositoryImpl extends Repository<PostEntity> implements PostRepository { }