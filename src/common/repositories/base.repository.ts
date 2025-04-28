import { DeepPartial, DeleteResult, SelectQueryBuilder } from 'typeorm';

/**
 * @alias Repository의 공통된 속성을 정의합니다.
 * @description 이 곳엔 Entity의 공통 적인 속성만을 정의하며
 * 보다 특수한 속성은 각 domain의 상속받는 Repository에서 정의합니다.
 */
export interface BaseRepository<T> {
  /**
   * @alias QueryBuilder를 생성 후 반환 합니다.
   * @description 복잡한 쿼리를 작성할 때만 사용합니다.
   */
  createQueryBuilder?(alias?: string): SelectQueryBuilder<T>;

  /**
   * @alias Entity를 생성합니다.
   */
  create?(entityLike: DeepPartial<T>): T;

  /**
   * @alias Entity를 저장합니다.
   */
  save?(entity: T): Promise<T>;

  /**
   * @alias PK로 지정한 한 개의 Record를 조회합니다.
   */
  findOneById?(id: number): Promise<T | null>;

  /**
   * @alias PK로 지정한 여러러 개의 Record를 조회합니다.
   */
  findById?(id: number): Promise<T[] | null>;

  /**
   * @alias PK로 지정한 Record 삭제합니다.
   */
  deleteOneById?(id: number): Promise<DeleteResult>;
}
