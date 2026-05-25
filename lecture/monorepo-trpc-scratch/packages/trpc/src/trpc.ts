import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router; // router -> functions declare

export const publicProcedure = t.procedure; // functions
