// 이 파일은 typeorm migration 스크립트에서 실행되는 파일입니다
import ormConfig from '@config/typeorm.config';
import { DataSource } from 'typeorm';

// db 접속 정보 반환
async function initializeDataSource() {
  const datasource = new DataSource({
    ...ormConfig,
    migrations: [`src/database/migrations/*.ts`],
    migrationsTableName: 'migrations',
  });
  return datasource;
}

export default initializeDataSource();
