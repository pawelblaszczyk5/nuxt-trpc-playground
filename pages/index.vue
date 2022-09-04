<script lang="ts" setup>
	const { data } = $(
		await useAsyncData(async () => await trpcClient.greeting.query({ name: 'test' })),
	);

	if (!data) {
		throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
	}
</script>

<template>
	<UiHeading>{{ data }}</UiHeading>
</template>
