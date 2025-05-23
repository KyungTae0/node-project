import { MigrationInterface, QueryRunner } from "typeorm";

export class Dev1745847123660 implements MigrationInterface {
    name = 'Dev1745847123660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`keyword_alerts\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '키워드 알림 고유 ID', \`author\` varchar(100) NOT NULL COMMENT '작성자 이름', \`keyword\` varchar(100) NOT NULL COMMENT '작성자가 등록한 키워드', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '게시글 고유 ID', \`title\` varchar(255) NOT NULL COMMENT '게시글 제목', \`content\` text NOT NULL COMMENT '게시글 본문 내용', \`author\` varchar(100) NOT NULL COMMENT '게시글 작성자 이름', \`password\` varchar(255) NOT NULL COMMENT '게시글 작성 시 입력된 비밀번호 (암호화 저장)', \`createdAt\` datetime NOT NULL COMMENT '게시글 생성 시각' DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL COMMENT '게시글 수정 시각' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX \`IDX_2d82eb2bb2ddd7a6bfac8804d8\` (\`title\`), INDEX \`IDX_d03fb91772937997f010466a00\` (\`author\`), INDEX \`IDX_46bc204f43827b6f25e0133dbf\` (\`createdAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '댓글 고유 ID', \`content\` text NOT NULL COMMENT '댓글 텍스트 내용', \`author\` varchar(100) NOT NULL COMMENT '댓글 작성자 이름', \`createdAt\` datetime NOT NULL COMMENT '댓글 작성 시각' DEFAULT CURRENT_TIMESTAMP, \`post_id\` int NULL COMMENT '게시글 고유 ID', \`parent_comment_id\` int NULL COMMENT '댓글 고유 ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_259bf9825d9d198608d1b46b0b5\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_93ce08bdbea73c0c7ee673ec35a\` FOREIGN KEY (\`parent_comment_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_93ce08bdbea73c0c7ee673ec35a\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_259bf9825d9d198608d1b46b0b5\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP INDEX \`IDX_46bc204f43827b6f25e0133dbf\` ON \`posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_d03fb91772937997f010466a00\` ON \`posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_2d82eb2bb2ddd7a6bfac8804d8\` ON \`posts\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`keyword_alerts\``);
    }

}
