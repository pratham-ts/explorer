// utils/trpc.ts
import type { AppRouter } from '@explorer/infrastructure';
import { createTRPCReact } from '@trpc/react-query';

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>();
