import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@monorepo-trpc-scratch/trpc';

export const trpc = createTRPCReact<AppRouter>();
