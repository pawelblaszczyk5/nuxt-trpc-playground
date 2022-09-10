export const useVisitedBefore = () => {
	let hasVisitedBefore = $(useState(useRoute().path + '_hasVisitedBefore', () => false));
	let isNextVisit = $(useState(useRoute().path + '_isNextVisit', () => false));

	onMounted(() => {
		if (isNextVisit && !hasVisitedBefore) {
			hasVisitedBefore = true;
			return;
		}

		if (!isNextVisit) {
			isNextVisit = true;
			return;
		}
	});

	return $$(hasVisitedBefore);
};
