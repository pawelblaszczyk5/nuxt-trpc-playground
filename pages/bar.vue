<script setup lang="ts">
	const x = $(useVisitedBefore());

	onMounted(() => {
		console.log(x);
	});
</script>

<template>
	<NuxtLink to="/">Link to home</NuxtLink>
</template>
