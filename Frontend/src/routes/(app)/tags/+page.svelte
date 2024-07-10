<script>
	import Footer from '$lib/components/Footer/footer.svelte';
	import TagDisplay from '$lib/components/Tags/tagDisplay.svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	/** @type {import('./$types').PageData} */
	export let data;

	let searchTerm = '';

	$: filteredTags = data.tags.filter((tag) =>
		tag.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<!-- <pre>{JSON.stringify(filteredTags, null, 2)}</pre> -->
<main>
	<section class="search">
		<h1>Tags</h1>
		<input type="text" bind:value={searchTerm} placeholder="Search" />
	</section>
	{#if filteredTags}
		<section>
			{#each filteredTags as tag (tag.title)}
				<div animate:flip={{ delay: 20, duration: 2000, easing: quintOut }}>
					<TagDisplay tag={tag.title} />
				</div>
			{/each}
			{#if filteredTags.length === 0}
				<p>No tags found</p>
			{/if}
		</section>
	{/if}
</main>
<footer>
	<Footer />
</footer>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
		margin-inline: auto;
		width: 80%;
		max-width: 600px;
	}

	section {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.search {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		flex-wrap: wrap;
	}
</style>
