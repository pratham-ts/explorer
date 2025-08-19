import express from 'express';
import { appRouter } from '@explorer/infrastructure';
import * as t from '@trpc/server/adapters/express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// Use the tRPC express middleware
app.use(
  '/trpc',
  t.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
