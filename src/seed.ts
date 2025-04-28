import { CommentEntity } from '@comment/domain/entities/comment.entity';
import ormConfig from '@config/typeorm.config';
import { KeywordAlertEntity } from '@keywordAlert/domain/entities/keywordAlert.entity';
import { PostEntity } from '@post/domain/entities/post.entity';
import { DataSource } from 'typeorm';

/**
 * @alias 초기 데이터 삽입
 * @description 테이블당 10개씩만
 */
async function seed() {
  const dataSource = new DataSource(ormConfig);
  await dataSource.initialize();

  // 게시글 10개 삽입
  const posts = await dataSource.getRepository(PostEntity).save(
    Array.from({ length: 10 }, (_, i) => ({
      title: `게시글 ${i + 1}`,
      content: `게시글 ${i + 1}의 내용`,
      author: `작성자${i + 1}`,
      // 비밀번호 임시로 1234로 지정
      password: `$2b$10$2Wn/YgdwgJavxTLQWiIrzeVUVV8pvcueuak2EcGye7hIiqhBhSjXq`,
    })),
  );

  // Comment 10개 (5개 댓글 + 5개 대댓글)
  const comments = await dataSource.getRepository(CommentEntity).save([
    { post: posts[0], content: '게시글1 댓글', author: '댓글작성자1' },
    { post: posts[1], content: '게시글2 댓글', author: '댓글작성자2' },
    { post: posts[2], content: '게시글3 댓글', author: '댓글작성자3' },
    { post: posts[3], content: '게시글4 댓글', author: '댓글작성자4' },
    { post: posts[4], content: '게시글5 댓글', author: '댓글작성자5' },
  ]);

  await dataSource.getRepository(CommentEntity).save([
    {
      post: posts[0],
      parentComment: comments[0],
      content: '게시글1 대댓글',
      author: '대댓글작성자1',
    },
    {
      post: posts[1],
      parentComment: comments[1],
      content: '게시글2 대댓글',
      author: '대댓글작성자2',
    },
    {
      post: posts[2],
      parentComment: comments[2],
      content: '게시글3 대댓글',
      author: '대댓글작성자3',
    },
    {
      post: posts[3],
      parentComment: comments[3],
      content: '게시글4 대댓글',
      author: '대댓글작성자4',
    },
    {
      post: posts[4],
      parentComment: comments[4],
      content: '게시글5 대댓글',
      author: '대댓글작성자5',
    },
  ]);

  // KeywordAlert 10개 삽입
  await dataSource.getRepository(KeywordAlertEntity).save(
    // "키워드1" 을 알림으로하는 작성자 -> 작성자1,작성자2
    // 키워드1~10 / 작성자1~5
    Array.from({ length: 10 }, (_, i) => ({
      // 작성자1~5
      author: `작성자${i + 1}`,
      // 키워드1~10
      keyword: `키워드${Math.floor(i / 2) + 1}`,
    })),
  );

  await dataSource.destroy();
}

seed();
