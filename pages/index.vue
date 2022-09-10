<script lang="ts" setup>
	import { TRPCClientError } from '@trpc/client';

	const [firstData, secondData] = await Promise.all([
		useAsyncData('test', () => trpcClient.greeting.query({ name: 'Bla bla' }), {
			initialCache: true,
		}),
		useAsyncData('test2', () => trpcClient.greeting.query({ name: 'Ble ble' }), {
			initialCache: true,
		}),
	]);

	const hasVisitedBefore = $(useVisitedBefore());

	const { data: greetingFirst, error: errorFirst, refresh: refreshFirst } = $(firstData);
	const { data: greetingSecond, error: errorSecond, refresh: refreshSecond } = $(secondData);

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

	onMounted(() => {
		if (hasVisitedBefore) {
			refreshFirst();
			refreshSecond();
		}
	});
</script>

<template>
	<div>
		<UiHeading>{{ greetingFirst }}</UiHeading>
		<UiHeading>{{ greetingSecond }}</UiHeading>
		<button @click="handleClick">Click me</button>
		<NuxtLink to="/foo">Link to test</NuxtLink>
		<NuxtLink to="/bar">Link to haha</NuxtLink>
	</div>
</template>
