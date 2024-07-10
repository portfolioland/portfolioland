<script>

	import PreviewWork from '$lib/components/Frontpage/previewWork.svelte';
	export let data;
	export let form;

	import { fade, fly, slide } from 'svelte/transition';
	let result = form?.results;
	$: results = result;

</script>

{#if results?.results.length > 0}
	<div
		class="searchResults"
		style="border-bottom: solid 0.1rem var(--text-light); border-top: solid 0.1rem var(--text-light); padding-top: 1rem;"
		transition:fly={{ y: -200, duration: 2000 }}
	>
		<h2>Search Results:</h2>
		<div class="grid">
			{#each results.results as work}
				<article class="card">
					<PreviewWork {work} />
				</article>
			{/each}
		</div>
	</div>
{:else if results?.results?.length === 0}
	<div
		class="searchResults"
		transition:fly={{ y: -200, duration: 2000 }}
		style="width: 100vw; height: 100vh"
	>
		<h2>No results found</h2>
	</div>
{/if}

<style>
	main a {
		text-decoration: none;
		color: var(--text-light);
		text-shadow: var(--tertiary) 0.01rem 0.01rem 0.1rem;
	}
	header {
		width: 100dvw, 100vw;
		position: sticky;
		top: 0;

		z-index: 10;
		padding: 0.5rem;
		display: flex;
		justify-content: space-between;
		border-bottom: solid 0.1rem var(--text-light);
		background-color: var(--bg-light);
		gap: 1rem;
		flex-wrap: wrap;
		& h1 {
			font-size: 1.5rem;
			margin: 0;
		}
	}
	.searchResults {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		overflow: auto;
		border-bottom: solid 0.1rem var(--text-light);
	}
	.showcase {
		display: flex;
		flex-direction: column;

		width: 100%;
		max-width: 1000px;
		max-height: 500px;
		overflow: hidden;
	}
	.about {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-right: 1rem;
		margin-top: 1rem;
		min-width: 500px;
		flex-wrap: wrap;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 3fr));
		grid-template-rows: repeat(auto-fit, minmax(500px, 3fr));
		gap: 0.5rem;
		overflow: auto;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 1rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 100%;

		aspect-ratio: 1 / 1;
	}
	.presenter {
		display: flex;
		justify-content: center;
		align-items: center;

		flex-direction: column;
		gap: 2rem;
		width: 100%;
		overflow-y: scroll;
	}
	.presenterElement {
		width: 96%;
		height: 20rem;
		overflow-x: hidden;
		border-left: dashed 0.1rem var(--text-light);
		justify-self: center;
		display: flex;
		flex-direction: row;
		padding-left: 2%;

		align-items: center;
		gap: 0.5rem;
		border: solid 2px var(--text-light);

		& .tags {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			width: 100%;
			justify-content: flex-start;
			margin-left: 1rem;
			margin-bottom: 1rem;

			gap: 0.5rem;
		}
		& h2 {
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			margin-left: 2%;
			white-space: pre;
		}
	}
	.appWrapper {
		margin-left: 1%;
		margin-right: 1%;

		//background-color: rgb(248 113 113);
		gap: 0.5rem;
		margin-top: 1rem;
		border: solid 0.1rem var(--text-light);
	}
	/* .appWrapper{
		margin-left: 1%;
		margin-right: 1%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
		border: solid 0.1rem var(--text-light);
	
		gap: 0.5rem;
	} */
	span {
		white-space: pre;
	}
	:global(.todo) {
		color: orange;
	}

	@media (max-width: 745px) {
		header {
			display: flex;
			justify-content: center;
		}
		header h1 {
			font-size: calc(2vw + 1rem);
			align-items: center;
		}
	}

	@media (max-width: 600px) {
		.grid {
			display: flex;
			flex-direction: column;
		}
	}
</style>

