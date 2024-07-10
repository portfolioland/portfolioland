<script>
	export let fetchedData;
	let query = '';
	async function fetchData(query) {
		const res = await fetch(`/api/search?query=${query}`);
		console.log(res);
		const data = await res.json();
		fetchedData = data;
	}
</script>

<div>
	<input
		type="text"
		bind:value={query}
		on:keydown={(e) => e.key === 'Enter' && fetchData(query)}
		placeholder="Search"
		aria-placeholder="Search"
	/>
	<button on:click={() => fetchData(query)}>Search</button>
</div>

<style>
	input {
		margin-right: 0.5rem;
		width: 100%;
	}
	input,
	button {
		font-size: calc(1rem 1vw + 0.5rem);


		/* padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid black;
		outline: none; */
	}
	div {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		width: 100%;
		max-width: 400px;

		padding-left: 1rem;
		padding-right: 1rem;
	}
</style>
