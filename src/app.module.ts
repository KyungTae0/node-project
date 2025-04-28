import { KeywordAlertModule } from '@keywordAlert/keywordAlert.module';
import { CommentModule } from '@comment/comment.module';
import { PostModule } from '@post/post.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import ormConfig from '@config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [config],
      envFilePath: `.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev').required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(ormConfig),
    PostModule,
    CommentModule,
    KeywordAlertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
