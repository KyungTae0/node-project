import { CommentEntity } from '@comment/domain/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * @alias 게시글 엔티티
 */
@Entity('posts')
export class PostEntity {
  /**
   * @alias 게시글 고유 ID
   */
  @PrimaryGeneratedColumn('increment', { comment: '게시글 고유 ID' })
  id: number;

  /**
   * @alias 게시글 제목
   */
  @Index()
  @Column({ type: 'varchar', length: 255, comment: '게시글 제목' })
  title: string;

  /**
   * @alias 게시글 내용
   */
  @Column({ type: 'text', comment: '게시글 본문 내용' })
  content: string;

  /**
   * @alias 작성자 이름
   */
  @Index()
  @Column({ type: 'varchar', length: 100, comment: '게시글 작성자 이름' })
  author: string;

  /**
   * @alias 게시글 비밀번호
   * @description 비밀번호는 bcrypt 해시로 저장된다.
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: '게시글 작성 시 입력된 비밀번호 (암호화 저장)',
  })
  password: string;

  /**
   * @alias 게시글 생성 시각
   * @description 게시글이 최초로 작성된 시간 (자동 기록)
   */
  @Index()
  @CreateDateColumn({
    type: 'datetime',
    comment: '게시글 생성 시각',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) =>
        new Date(value).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  })
  createdAt: Date;

  /**
   * @alias 게시글 수정 시각
   * @description 게시글이 마지막으로 수정된 시간 (자동 갱신)
   */
  @UpdateDateColumn({
    type: 'datetime',
    comment: '게시글 수정 시각',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) =>
        new Date(value).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  })
  updatedAt: Date;

  /**
   * @alias 댓글 목록
   * @description 이 게시글에 달린 댓글 리스트
   */
  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
