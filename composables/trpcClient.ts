import type { AppRouter } from '~~/server/trpc';

import { createTRPCProxyClient } from '@trpc/client';

export const trpcClient = createTRPCProxyClient<AppRouter>({
	url: '/api/trpc',
	fetch: async (input, init) => {
		const normalizedInput = input instanceof URL ? input.toString() : input;
		const response = await $fetch.raw<string>(normalizedInput, {
			...init,
			parseResponse: response => response,
		});

		return new Response(response._data, {
			status: response.status,
			headers: response.headers,
			statusText: response.statusText,
		});
	},
});
