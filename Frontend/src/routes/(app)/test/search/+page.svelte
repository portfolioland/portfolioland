<script>
	export let data;
	export let form;
	let results = form?.results;
</script>

<form
	action="?/search"
	method="post"
	on:submit={(e) => e.key === 'Enter' && e.preventDefault()}

>
	<input type="text" name="query" placeholder="Search" />
	<button type="submit">Search</button>

	{#await results}
		<p>Searching ...</p>
	{:then results}
		{#if results?.length > 0}
			<ul>
				{#each results as result}
					<li>{result.title}</li>
				{/each}
			</ul>
		{:else if results?.results === undefined}
			<p>What you are looking for could not be found ...</p>
		{:else if results?.error}
			<p>{results.error}</p>
		{/if}
	{/await}
	<!-- 
	{#if results?.length > 0}
		<ul>
			{#each results as result}
				<li>{result.title}</li>
			{/each}
		</ul>
	{:else if results?.results === undefined}
		<p>What you are looking for could not be found ...</p>
	{:else if results?.error}
		<p>{results.error}</p>
	{/if} -->
</form>
Data
<pre>{JSON.stringify(data, null, 2)}</pre>
results
<pre>{JSON.stringify(results, null, 2)}</pre>
