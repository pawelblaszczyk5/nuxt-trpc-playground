<script lang="ts" setup>
	import { TRPCClientError } from '@trpc/client';

	const [firstData, secondData] = await Promise.all([
		useAsyncData('test', () => trpcClient.greeting.query({ name: 'Bla bla' })),
		useAsyncData('test2', () => trpcClient.greeting.query({ name: 'Ble ble' })),
	]);

	const { data: greetingFirst, error: errorFirst } = $(firstData);
	const { data: greetingSecond, error: errorSecond } = $(secondData);

	if (errorFirst || errorSecond) {
		throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
	}

	const handleClick = async () => {
		try {
			const data = await trpcClient.greeting.query({ name: '5' });

			console.log(data);
		} catch (error) {
			console.log(error instanceof TRPCClientError ? error.data : '');
		}
	};
</script>

<template>
	<div>
		<UiHeading>{{ greetingFirst }}</UiHeading>
		<UiHeading>{{ greetingSecond }}</UiHeading>
		<button @click="handleClick">Click me</button>
	</div>
</template>
