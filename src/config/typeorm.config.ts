import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';
import { CommentEntity } from '@comment/domain/entities/comment.entity';
import { PostEntity } from 'domains/post/domain/entities/post.entity';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
// 환경 변수 로드
// const env = dotenv.config({
//   path: `.env`,
// }).parsed;

// 항상 무조건 dotenv를 로드
dotenv.config();

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

// console.log('process.env.MIGRATION_ENV', process.env.MIGRATION_ENV);
console.log('process.env.DATABASE_HOST', process.env.DATABASE_HOST);

export default ormConfig;
