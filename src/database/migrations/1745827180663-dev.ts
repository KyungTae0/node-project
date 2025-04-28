// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class Dev1745827180663 implements MigrationInterface {
//   name = 'Dev1745827180663';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE \`posts\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL COMMENT '게시글 생성 시각' DEFAULT CURRENT_TIMESTAMP`,
//     );
//     await queryRunner.query(
//       `CREATE INDEX \`IDX_46bc204f43827b6f25e0133dbf\` ON \`posts\` (\`createdAt\`)`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `DROP INDEX \`IDX_46bc204f43827b6f25e0133dbf\` ON \`posts\``,
//     );
//     await queryRunner.query(
//       `ALTER TABLE \`posts\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL COMMENT '게시글 생성 시각' DEFAULT CURRENT_TIMESTAMP(6)`,
//     );
//   }
// }
