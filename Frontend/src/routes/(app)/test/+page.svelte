<script>
	import Grid, { GridItem } from 'svelte-grid-extended';
	import { fade } from 'svelte/transition';
	export let data;

	let items = [
		{ id: '0', x: 0, y: 0, w: 2, h: 5, content: 'paragraph1' },
		{ id: '1', x: 2, y: 2, w: 2, h: 2, content: 'paragraph12' },
		{ id: '2', x: 2, y: 0, w: 1, h: 2, content: 'paragraph123' },
		{ id: '3', x: 3, y: 0, w: 2, h: 2, content: 'paragraph1234' },
		{ id: '4', x: 4, y: 2, w: 1, h: 3, content: 'paragraph12345' },
		{ id: '5', x: 8, y: 0, w: 2, h: 8, content: 'paragraph123456' }
	];
	let gridController;
	const itemSize = { height: 40 };

	$: item = items;
	function addNewP() {
		let newItem = {
			id: '6',
			x: 1,
			y: 1,
			w: 4,
			h: 4,
			content: 'This is a newq Paragraph'
		};

		items = [...items, ...[newItem]];
		return items;
	}
	function addNewItem() {
		const w = Math.floor(Math.random() * 2) + 1;
		const h = Math.floor(Math.random() * 5) + 1;
		const newPosition = gridController.getFirstAvailablePosition(w, h);
		items = newPosition
			? [
					...items,
					{
						id: crypto.randomUUID(),
						x: newPosition.x,
						y: newPosition.y,
						w,
						h,
						content: 'NEW Content'
					}
				]
			: items;
	}
	export const remover = (item) => {
		items = items.filter((value) => value.id !== item);
		return items;
	};
</script>

<button on:click={addNewP}>add new p</button>
<button on:click={addNewItem}>Add New Item</button>

<!-- <pre>{JSON.stringify(item, null, 2)}</pre> -->
<div class="Grid">
	<Grid {itemSize} cols={20} collision="push" bind:controller={gridController}>
		{#each item as { id, x, y, w, h, content } (id)}
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
								on:click={() => remover(id)}
								class="remove"
							>
								✕</button
							>
						</span>

						<!-- {id} -->
						<p contenteditable="true">{content}</p>
					</div>
					<input type="text" name="{id} x" bind:value={x} />
					<input type="text" name="{id} x" bind:value={id} />
				</GridItem>
			</div>
		{/each}
	</Grid>
</div>

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
