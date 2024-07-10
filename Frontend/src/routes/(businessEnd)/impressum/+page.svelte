<script>
	import Footer from '$lib/components/Footer/footer.svelte';
	export let data;
</script>

<main>
	{@html data.impressum[0].impressum}
</main>

<Footer />

<style>
	main {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		gap: 1rem;
		margin-inline: auto;

		width: 80%;
		max-width: 600px;
		margin-bottom: 5rem;

		& p {
		}
	}

	@media (max-width: 600px) {
		main {
			width: 85%;
		}
	}
	p {
		width: fit-content;
	}

	button {
		height: 2rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
		margin-right: 3%;
		margin-top: 0.5%;
	}
</style>
