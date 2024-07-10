<script>
	import { enhance } from '$app/forms';
	import Footer from '../Footer/footer.svelte';
	let toggle = true;

	export let data;

	let date = new Date(data.terms[0].updated).toLocaleDateString('de-DE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
</script>

<!-- <pre>{JSON.stringify(data.terms[0].condition, null, 2)}</pre> -->
<main>
	<h2>Terms and conditions:</h2>
	<p>
		{@html data.terms[0].condition}
	</p>

	<form method="POST" action="?/terms" enctype="multipart/form-data" name="terms" id="terms">
		<input type="hidden" id="terms" name="terms" bind:value={toggle} />

		<p>Datum: {date}</p>

		<button>Gelesen und akzeptiert</button>
	</form>
</main>
<Footer />

<style>
	main {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-inline: auto;

		width: 80%;
		max-width: 600px;
		margin-bottom: 5rem;

		& p {
			white-space: pre-wrap;
		}
		& form {
			display: flex;
			flex-direction: row;
			gap: 1rem;
			width: 100%;
			justify-content: space-between;
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
</style>
