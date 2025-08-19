import { GetPostsUseCase } from '@explorer/use-cases';
import { publicProcedure, router } from './router';
import { InMemoryPostRepository } from '../../repositories';

const postRepository = new InMemoryPostRepository();

export const postsRouter = router({
  list: publicProcedure.query(() => {
    const getPostsUseCase = new GetPostsUseCase(postRepository);
    return getPostsUseCase.execute();
  }),
});
