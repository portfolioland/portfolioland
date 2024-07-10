<script>
	import Grid, { GridItem } from 'svelte-grid-extended';
	import {
		itemSize,
		rows,
		col
	} from '$lib/components/Profil_Work_SiteBuilder/1_Locator/LocatorSvelte-grid-extended/config';
	import Headline from '$lib/components/Profil_Work_SiteBuilder/3_text/headline.svelte';
	import Paragraph from '$lib/components/Profil_Work_SiteBuilder/3_text/paragraph.svelte';
	import Pictures from '$lib/components/Profil_Work_SiteBuilder/2_image/pictures.svelte';

	export let data;
	let innerWidth = 0;
	$: cols = col(innerWidth);

	let toggle = false;

	// let items = [];
	// * Add Elements for the Locator viewer
	// data.locator.forEach((element) => {
	// 	itemsPusher(COLS, items, element, false);
	// });
</script>

<svelte:window bind:innerWidth />
<div class="demo-container">
	<Grid
		{itemSize}
		{rows}
		{cols}
		collision="none"
		class={toggle ? 'grid' : 'gridViewer'}
		gap={1}
		readOnly={!toggle}
	>
		{#each data.locator as { id, x, y, w, h, type, content } (id)}
			<GridItem
				{id}
				bind:x
				bind:y
				bind:w
				bind:h
				class={toggle ? 'grid-item' : 'grid-item-watcher'}
				activeClass="grid-item-active"
				previewClass="preview"
			>
				{#if type == 'headlines'}
					<Headline updateContent {content} contenteditable={toggle} />
				{/if}
				{#if type == 'paragraphs'}
					<Paragraph updateContent {content} contenteditable={toggle} />
				{/if}
				{#if type == 'pictures'}
					<Pictures {content} {id} credits="" />
				{/if}
			</GridItem>
		{/each}
	</Grid>
</div>

<!-- <div class="menuwrapper">
	<span>
		Title: {data.work}
	</span>
	<span>
		Artists: {#each data.artist as artist}
			<a href="/artists/{artist}">{artist} </a>
			<span> </span>
		{/each}
	</span>
	<span> Entstehungsjahr: {data.jahr} </span>
	<span>Tags: {data.tag}</span>
</div> -->

<style>
	:global(html) {
		width: 100dvw, 100vw;
	}

	.demo-widget {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.demo-container {
		max-width: 100dvw, 100vw;
		width: 100%;
		& button {
			background-color: transparent;

			border: none;
		}
		/* background-color: rgb(120 53 15); */
	}

	.menuwrapper {
		outline: solid 0.1rem black;
		background-color: rgb(251 191 36);

		width: 100vw;

		padding: 0.5rem;

		display: flex;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;
		gap: 1rem;

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		& a {
			color: var(--text-light);
		}
	}
</style>
