import { initTRPC, TRPCError } from '@trpc/server';
import z from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
	greeting: t.procedure.input(z.object({ name: z.string() })).query(({ input: { name } }) => {
		if (Math.random() < 0.2) {
			throw new TRPCError({ message: 'bla bla', code: 'UNAUTHORIZED' });
		}
		return `Hello ${name}`;
	}),
});

export type AppRouter = typeof appRouter;
