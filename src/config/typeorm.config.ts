import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';
import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { PostEntity } from 'domains/post/domain/entities/post.entity';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
// 환경 변수 로드
dotenv.config();

/**
 * @alias TypeORM 데이터베이스 설정
 */
const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [PostEntity, CommentEntity, KeywordAlertEntity],
  synchronize: false,
  logging: true,
  timezone: '+09:00',
  charset: 'utf8mb4',
};

export default ormConfig;
