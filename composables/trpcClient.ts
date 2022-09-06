import type { AppRouter } from '~~/server/trpc';

import { createTRPCProxyClient } from '@trpc/client';

export const trpcClient = createTRPCProxyClient<AppRouter>({
	url: import.meta.env['SSR']
		? `http://localhost:${process.env['NITRO_PORT'] || process.env['PORT'] || 3e3}/api/trpc`
		: '/api/trpc',
	headers: () => useRequestHeaders(['cookie']),
	fetch: async (input, init) => {
		const response = await fetch(input, init);

		if (import.meta.env['SSR']) {
			const event = useRequestEvent();

			event.res.setHeader('set-cookie', response.headers.get('set-cookie') || '');
		}

		return response;
	},
});
