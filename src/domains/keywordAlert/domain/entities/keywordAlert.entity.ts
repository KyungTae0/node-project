import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * @alias 키워드 알림 엔티티
 */
@Entity('keyword_alerts')
export class KeywordAlertEntity {
  /**
   * @alias 키워드 알림 고유 ID
   */
  @PrimaryGeneratedColumn('increment', { comment: '키워드 알림 고유 ID' })
  id: number;

  /**
   * @alias 작성자 이름
   * @description 작성자는 동명이인이 없다고 가정한다.
   */
  @Column({ type: 'varchar', length: 100, comment: '작성자 이름' })
  author: string;

  /**
   * @alias 알림 키워드
   */
  @Column({ type: 'varchar', length: 100, comment: '작성자가 등록한 키워드' })
  keyword: string;
}
