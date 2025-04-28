import { KeywordAlertService } from '@keywordAlert/application/keywordAlert.service';
import { KeywordAlertTarget } from '@keywordAlert/shared/keyword-alert.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepositoryImpl } from '@post/infrastructure/persistence/post.repository.impl';
import { CreatePostInput } from '@post/presentation/dtos/create-post-input.dto';
import { CreatePostOutput } from '@post/presentation/dtos/create-post-output.dto';
import { DeletePostOutput } from '@post/presentation/dtos/delete-post-output.dto';
import { DeletePostInput } from '@post/presentation/dtos/delete-post-input.dto';
import { GetPostsInput } from '@post/presentation/dtos/get-posts-input.dto';
import { GetPostsOutput } from '@post/presentation/dtos/get-posts-output.dto';
import { UpdatePostInput } from '@post/presentation/dtos/update-post-input.dto';
import { UpdatePostOutput } from '@post/presentation/dtos/update-post-output.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepositoryImpl,
    private readonly keywordAlertService: KeywordAlertService,
  ) {}

  //#region public
  async getPosts({
    page,
    author,
    size,
    title,
  }: GetPostsInput): Promise<GetPostsOutput> {
    try {
      const [posts, totalCount] = await this.postRepository.findPosts({
        page,
        size,
        author,
        title,
      });

      return {
        success: true,
        nowPage: Number(page) || 1,
        totalPage: Math.ceil(totalCount / Number(size)),
        totalCount,
        posts,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  /**
   * @alias 게시글 생성
   */
  async createPost(input: CreatePostInput): Promise<CreatePostOutput> {
    try {
      // 비밀번호는 암호화 후 저장
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const savedPost = await this.postRepository.createPost({
        ...input,
        password: hashedPassword,
      });

      // 작성한 게시글의 본문, 제목에서 사용된 단어를 키워드로 등록 해놓은 사람들에게 알람
      await this.keywordAlertService.sendKeywordAlert({
        // 조회할 키워드는 게시글 제목, 본문
        content: [input.content, input.title].join(' '),
        entity: savedPost,
        target: KeywordAlertTarget.POST,
      });

      return { success: true, id: savedPost.id };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  /**
   * @alias 지정한 id의 게시글 수정
   */
  async updatePost(
    id: number,
    input: UpdatePostInput,
  ): Promise<UpdatePostOutput> {
    // 1. 지정한 ID로 게시글 조회
    const post = await this.postRepository.findOneById(id);
    if (!post) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    // 2. 암호화 된 비밀번호 확인
    const isMatch = await bcrypt.compare(input.password, post.password);
    if (!isMatch) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 3. 게시글 수정
    const updatedPost = await this.postRepository.updatePost(id, {
      // 수정 할 내용이 없으면 기존 값으로 대체
      title: input.title ?? post.title,
      content: input.content ?? post.content,
    });

    return { success: true, id: updatedPost.id };
  }

  /**
   * @alias 게시글 삭제
   */
  async deletePost(
    id: number,
    input: DeletePostInput,
  ): Promise<DeletePostOutput> {
    // 1. 삭제할 게시글 조회
    const post = await this.postRepository.findOneById(id);
    if (!post) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    // 2. 게시글 비밀번호 확인
    const isMatch = await bcrypt.compare(input.password, post.password);
    if (!isMatch) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.FORBIDDEN,
      );
    }

    // 3. 게시글 삭제
    await this.postRepository.deleteOneById(id);
    return { success: true, id: post.id };
  }
  //#endregion public
}
