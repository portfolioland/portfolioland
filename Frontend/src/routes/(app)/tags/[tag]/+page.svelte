<script>
	import SortButton from '$lib/components/Buttons/sortButton.svelte';
	import ImgDisplay from '$lib/components/Frontpage/imgDisplay.svelte';
	import TagDisplay from '$lib/components/Tags/tagDisplay.svelte';
	import { sort } from 'fast-sort';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import PreviewWork from '$lib/components/Frontpage/previewWork.svelte';
	import { PUBLIC_PB_URL } from '$env/static/public';

	export let data;

	let isAscendingArtists = true;
	let isAscendingTitle = true;
	let isAscendingYear = true;
	$: sortedData = sortData(data.work, 'year', isAscendingYear);

	let activeYear = false;
	let activeArtists = false;
	let activeTitle = false;

	/**
	 * Sorts the given data based on the specified key and order.
	 * @param {Array} data - The data to be sorted.
	 * @param {string} key - The key to sort the data by (e.g., 'year', 'artists', 'title').
	 * @param {boolean} [isAscending=true] - The order of sorting, default is ascending.
	 * @returns {Array} - The sorted data.
	 */
	function sortData(data, key, isAscending = true) {
		let sortedData;
		switch (key) {
			case 'year':
				sortedData = isAscending ? sort(data).asc((u) => u.jahr) : sort(data).desc((u) => u.jahr);
				break;
			case 'artists':
				sortedData = isAscending
					? sort(data).asc((u) => u.expand.artists[0].name)
					: sort(data).desc((u) => u.expand.artists[0].name);
				break;
			case 'title':
				sortedData = isAscending ? sort(data).asc((u) => u.title) : sort(data).desc((u) => u.title);
				break;
		}
		return sortedData;
	}

	/**
	 * Handles sorting of data based on the provided key
	 * @param {string} key - The key to sort the data by (e.g. 'year', 'artists', 'title')
	 */
	function handleSort(key) {
		switch (key) {
			case 'year':
				isAscendingYear = !isAscendingYear;
				activeYear = true;
				activeArtists = false;
				activeTitle = false;
				sortedData = sortData(data.work, 'year', isAscendingYear);
				toggleAnimate();
				break;
			case 'artists':
				isAscendingArtists = !isAscendingArtists;
				activeYear = false;
				activeArtists = true;
				activeTitle = false;
				sortedData = sortData(data.work, 'artists', isAscendingArtists);
				toggleAnimate();
				break;
			case 'title':
				isAscendingTitle = !isAscendingTitle;
				activeYear = false;
				activeArtists = false;
				activeTitle = true;
				sortedData = sortData(data.work, 'title', isAscendingTitle);
				toggleAnimate();
				break;
		}
	}

	onMount(() => {
		sortedData = sortData(data.work, 'year', isAscendingYear);
		activeYear = true;
		activeArtists = false;
		activeTitle = false;

		// console.log(sortedData
	});
	let animate = false;

	function toggleAnimate() {
		animate = !animate;
	}
</script>

{#each sortedData as work (work)}
	<div class="workFooter" animate:flip={{ delay: 250, duration: 2000, easing: quintOut }}>
		<article class="card">
			<section class="image">
				{#if work.image}
					<a href="/artists/{work.expand?.artists[0].name}/{work.title}">
						<img
							src="{PUBLIC_PB_URL}api/files/pictures/{work.image?.id}/{work.image?.content} "
							alt=""
						/>
					</a>
				{:else}
					<a href="/artists/{work.expand?.artists[0].name}/{work.title}">
						<img src="https://via.placeholder.com/300x300?text=No+Image" alt="No pic" />
					</a>
				{/if}
			</section>
			<section class="info">
				<section class="title">
					<a href="/artists/{work.expand?.artists[0].name}/{work.title}">{work.title}</a>
				</section>
				<section class="name">
					<a href="/artists/{work.expand?.artists[0].name}">{work.expand?.artists[0].name}</a>
				</section>
				<section class="jahr">{work.jahr}</section>

				<section class="tags">
					{#if work.expand?.tag}
						{#each work.expand?.tag as tag}
							<TagDisplay tag={tag.title} />
						{/each}
					{/if}
				</section>
			</section>
		</article>
	</div>
{/each}

<menu>
	{#if activeArtists}
		{#if isAscendingArtists}
			<p transition:fade={{ duration: 2000 }}>Artists: ↑</p>
		{:else}
			<p transition:fade={{ duration: 2000 }}>Artists: ↓</p>
		{/if}
	{:else if activeTitle}
		{#if isAscendingTitle}
			<p transition:fade={{ duration: 2000 }}>Title: ↑</p>
		{:else}
			<p transition:fade={{ duration: 2000 }}>Title: ↓</p>
		{/if}
	{:else if activeYear}
		{#if isAscendingYear}
			<p transition:fade={{ duration: 2000 }}>Year: ↑</p>
		{:else}
			<p transition:fade={{ duration: 2000 }}>Year: ↓</p>
		{/if}
	{/if}

	<SortButton
		isAscending={isAscendingArtists}
		handleClick={() => handleSort('artists')}
		buttonText="Artists"
		isActive={activeArtists}
	/>
	<SortButton
		isAscending={isAscendingTitle}
		handleClick={() => handleSort('title')}
		buttonText="Title"
		isActive={activeTitle}
	/>
	<SortButton
		isAscending={isAscendingYear}
		handleClick={() => handleSort('year')}
		buttonText="Jahr"
		isActive={activeYear}
	/>
</menu>

<style>
	h1 {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
	.workFooter {
		display: flex;

		width: 80%;
		margin-left: 10%;
		margin-right: 10%;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
		background-color: var(--bg-bright);
		//border: solid 0.1rem var(--text-light);
		//border-radius: 0.5rem;
		padding: 0.9rem;
	}

	.card {
		display: flex;
		flex-direction: row;
		width: 100%;

		gap: 2rem;
		justify-content: space-between;
		align-items: center;
	}

	.tags {
		margin-right: 1rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: end;
		justify-content: end;
		width: 80%;
	}
	menu {
		width: 20%;
		margin-left: 5%;
		margin-right: 75%;
		z-index: 3;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: center;

		border-radius: 0.5rem;

		bottom: 0;
		right: 0;
		left: 0;

		position: fixed;
	}

	article {
		width: 90%;
		height: 90%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		border: solid 0.1rem var(--text-light);

		grid-column: span 2;
	}
	section {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	a {
		text-decoration: none;
		color: var(--text-light);
		&:hover {
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 1000ms;
		}
	}
	@media (max-width: 1050px) {
		menu {
			display: flex;

			gap: 1rem;
			align-items: center;
			justify-content: center;
		}

		.workFooter {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			margin-bottom: 2rem;
		}

		.info {
			display: flex;
			flex-direction: column;
			margin-left: 1rem;
			align-self: start;
			justify-content: space-between;
		}

		.tags {
			margin-right: 1rem;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: center;
			justify-content: center;
		}
	}

	@media (max-width: 600px) {
		.card{
			flex-direction: column;
			gap: 1rem;
		}

		.tags {
			margin-right: 1rem;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: center;
			justify-content: center;
		}
	}
</style>
