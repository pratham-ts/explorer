import { t } from './context.js';
import { postsRouter } from './routers/posts.router.js';

export const appRouter = t.router({
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
