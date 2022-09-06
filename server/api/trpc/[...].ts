import { resolveHTTPResponse } from '@trpc/server';
import { createURL } from 'ufo';

import { appRouter } from '~~/server/trpc';

export default defineEventHandler(async event => {
	const { req, res } = event;

	if (!req.url || !req.method) {
		res.statusCode = 500;
		return;
	}

	const url = createURL(req.url);

	console.log(parseCookies(event));

	const httpResponse = await resolveHTTPResponse({
		router: appRouter,
		req: {
			method: req.method,
			headers: req.headers,
			body: isMethod(event, 'GET') ? null : await useBody(event),
			query: url.searchParams,
		},
		path: url.pathname.slice(10),
		createContext: async () => ({}),
	});

	setCookie(event, 'test', 'testValue');

	const { status, headers, body } = httpResponse;

	res.statusCode = status;

	if (headers) {
		Object.keys(headers).forEach(key => {
			const value = headers[key];

			if (typeof value !== 'undefined') res.setHeader(key, value);
		});
	}

	return body;
});
