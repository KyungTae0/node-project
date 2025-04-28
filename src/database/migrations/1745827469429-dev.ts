import { MigrationInterface, QueryRunner } from "typeorm";

export class Dev1745827469429 implements MigrationInterface {
    name = 'Dev1745827469429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updatedAt\` \`updatedAt\` datetime NOT NULL COMMENT '게시글 수정 시각' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL COMMENT '댓글 작성 시각' DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL COMMENT '댓글 작성 시각' DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL COMMENT '게시글 수정 시각' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

}
