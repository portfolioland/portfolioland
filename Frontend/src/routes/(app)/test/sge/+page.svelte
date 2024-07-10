<script>
	import Grid, { GridItem } from 'svelte-grid-extended';
	import { fade } from 'svelte/transition';
	import { addNewItem2, addNewPara, addNewPicture, remover } from './utils.js';
	import Paragraph from '$lib/components/Profil_Work_SiteBuilder/3_text/paragraph.svelte';
	import Headline from '$lib/components/Profil_Work_SiteBuilder/3_text/headline.svelte';
	import ImageUploadPlaceholder from '$lib/components/Profil_Work_SiteBuilder/2_image/pictures.svelte';

	export let data;

	let items = [
		{
			id: crypto.randomUUID(),
			x: 0,
			y: 0,
			w: 2,
			h: 5,
			content: 'paragraph1',
			component: Paragraph
		},
		{
			id: crypto.randomUUID(),
			x: 2,
			y: 2,
			w: 2,
			h: 2,
			content: 'paragraph12',
			component: Headline
		},
		{
			id: crypto.randomUUID(),
			x: 2,
			y: 0,
			w: 1,
			h: 2,
			content: 'paragraph123',
			component: ImageUploadPlaceholder
		},
		{
			id: crypto.randomUUID(),
			x: 3,
			y: 0,
			w: 2,
			h: 2,
			content: 'paragraph1234',
			component: Paragraph
		},
		{
			id: crypto.randomUUID(),
			x: 4,
			y: 2,
			w: 1,
			h: 3,
			content: 'paragraph12345',
			component: Paragraph
		},
		{
			id: crypto.randomUUID(),
			x: 8,
			y: 0,
			w: 2,
			h: 8,
			content: 'paragraph123456',
			component: Paragraph
		}
	];

	const itemSize = { height: 50 };
	let gridController;

	$: item = items;
	// Functions to add shit...
	function addNewP() {
		items = addNewPara(items);
		return items;
	}
	function addNewItem() {
		items = addNewItem2(items, gridController);
		return items;
	}
	function addNewH2() {
		items = addNewH2(items);
		return items;
	}
	function addNewPic() {
		items = addNewPicture();
		return items;
	}
	function removal(id) {
		items = remover(id, items);
		return items;
	}
	function updateContent(id, newContent) {
		items = items.map((item) =>
			item.id === id ? { ...item, w: newContent.length(), content: newContent } : item
		);
	}
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<button on:click={addNewP}>add new p</button>
<button on:click={addNewItem}>Add New Item</button>
<button on:click={addNewH2}>Add new H2</button>
<button on:click={addNewPic}>Add new Picture</button>

<div class="Grid">
	<Grid {itemSize} cols={20} collision="push" bind:controller={gridController}>
		{#each item as { id, x, y, w, h, content, component } (id)}
			<div transition:fade={{ duration: 300 }}>
				<GridItem
					{id}
					bind:x
					bind:y
					bind:w
					bind:h
					class="grid-item"
					activeClass="grid-item-active"
					previewClass="bg-red-500 rounded"
				>
					<div class="item">
						<span>
							<button
								on:pointerdown={(e) => e.stopPropagation()}
								on:click={() => removal(id)}
								class="remove"
							>
								✕</button
							>
						</span>
				
						<svelte:component
							this={component}
							{id}
							{content}
							bind:paragraphData={content}
							updateContent={(newContent) => updateContent(id, newContent)}
						/>
						<!-- * hier wird der Content Updater durchgepipte an den content editor der text-bausteine -->
					</div>
				</GridItem>
			</div>
		{/each}
	</Grid>
</div>
<pre>{JSON.stringify(item, null, 2)}</pre>

<style>
	.Grid {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.item {
		color: black;
	}
	:global(.grid-container) {
		opacity: 0.7;
	}

	:global(.grid-item) {
		transition:
			width 4s,
			height 4s;
		transition:
			transform 4s,
			opacity 4s;
		outline: dashed 2px red;
	}

	:global(.grid-item-active) {
		opacity: 0.1;
	}

	/* tailwind classes */
	:global(.bg-red-500) {
		background-color: rgb(202, 33, 33);
	}

	:global(.rounded) {
		border-radius: 0.25rem;
	}
</style>
