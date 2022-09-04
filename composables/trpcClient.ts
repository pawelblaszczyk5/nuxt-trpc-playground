import type { AppRouter } from '~~/server/trpc';

import { createTRPCProxyClient } from '@trpc/client';

export const trpcClient = createTRPCProxyClient<AppRouter>({
	url: import.meta.env['SSR']
		? `http://localhost:${process.env['NITRO_PORT'] || process.env['PORT'] || 3e3}/api/trpc`
		: '/api/trpc',
	headers: useRequestHeaders(['cookie']),
});
