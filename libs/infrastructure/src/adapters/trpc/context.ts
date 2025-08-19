import { initTRPC } from '@trpc/server';

export const t = initTRPC.create();
export type Context = Record<string, never>;
export const createContext = (): Context => ({});
