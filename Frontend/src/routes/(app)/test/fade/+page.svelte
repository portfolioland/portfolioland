<script>
	import { fade } from 'svelte/transition';

	let fetchedData;
	$: fetcher = fetchedData;
	let query = '';
	async function fetchData(query) {
		const res = await fetch(`/api/search?query=${query}`);
		console.log(res);
		const data = await res.json();
		fetchedData = data;
	}
</script>

<input type="text" bind:value={query} />
<button on:click={() => fetchData(query)}>Fetch Data</button>
{#await fetcher}
	<p>Loading ...</p>
{:then fetchedData}
	{#if fetchedData?.results}
		{#each fetchedData.results as result}
			<div
				in:fade={{ duration: 2000 }}
				out:fade={{ duration: 2000 }}
				style="border: 1px solid black; padding: 1rem;width: 20px"
			>
				{result.title}
			</div>
		{/each}
	{:else}
		<p>No results found</p>
	{/if}
{/await}
