import { PostEntity } from '@post/domain/entities/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * @alias 댓글 엔티티
 */
@Entity('comments')
export class CommentEntity {
  /**
   * @alias 댓글 고유 ID
   */
  @PrimaryGeneratedColumn('increment', { comment: '댓글 고유 ID' })
  id: number;

  /**
   * @alias 댓글 내용
   */
  @Column({ type: 'text', comment: '댓글 텍스트 내용' })
  content: string;

  /**
   * @alias 댓글 작성자
   */
  @Column({ type: 'varchar', length: 100, comment: '댓글 작성자 이름' })
  author: string;

  /**
   * @alias 댓글 작성 시각
   * @description 댓글이 최초 작성된 시간 (자동 기록)
   */
  @CreateDateColumn({
    type: 'datetime',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP()',
    comment: '댓글 작성 시각',
    transformer: {
      to: (value: Date) => value,
      // KST 시간 변환
      from: (value: string) =>
        new Date(value).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  })
  createdAt: Date;

  /**
   * @alias 연결된 게시글
   * @description 이 댓글이 소속된 게시글(PostEntity)
   */
  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  /**
   * @alias 부모 댓글
   * @description 대댓글일 경우 참조하는 부모 댓글 (없으면 NULL)
   */
  @ManyToOne(() => CommentEntity, (comment) => comment.childrenComment, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: CommentEntity | null;

  /**
   * @alias 자식 댓글 목록
   * @description 이 댓글을 부모로 가지는 대댓글 리스트
   */
  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  childrenComment: CommentEntity[];
}
