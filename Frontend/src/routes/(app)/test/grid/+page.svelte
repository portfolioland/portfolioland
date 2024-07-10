<script>
	import {
		itemSize,
		rows
	} from '$lib/components/Profil_Work_SiteBuilder/1_Locator/LocatorSvelte-grid-extended/config.js';
	import { fade } from 'svelte/transition';
	import Grid, { GridItem } from 'svelte-grid-extended';

	export let data;
	let locator = [];
	data.locator?.forEach((element) => {
		locator = [...locator, ...element.locator];
	});

	$: items = locator;

	let gridController;

	function addNewItem() {
		const w = 20;
		const h = 2;
		const newPosition = gridController.getFirstAvailablePosition(w, h);
		const id = crypto.randomUUID();
		const newItem = { id, w, h, ...newPosition, content: 'New Item' };
		items = [...items, newItem];
		locator = items;
	}
	let innerWidth = 0;
	$: cols = innerWidth / 3;
</script>

<svelte:window bind:innerWidth />
<pre>{JSON.stringify(items, null, 2)}</pre>

<button class="btn" on:click={addNewItem}>Add New Item</button>
<div style="width: 100vw; height: 100vh;background-color: red">
	<Grid {itemSize} {rows} {cols} collision="none" bind:controller={gridController} bounds={true}>
		{#each items as item (item.id)}
			<div transition:fade={{ duration: 300 }}>
				<GridItem id={item.id} bind:x={item.x} bind:y={item.y} bind:w={item.w} bind:h={item.h}>
					<button
						on:pointerdown={(e) => e.stopPropagation()}
						on:click={() => (locator = items.filter((i) => i.id !== item.id))}
						class="remove"
					>
						✕
					</button>
					<div class="item">{item.id.slice(0, 5)}</div>
					<div>{item.content}</div>
				</GridItem>
			</div>
		{/each}
	</Grid>
</div>

<style>
	.item {
		display: grid;
		place-items: center;
		background-color: rgb(150, 150, 150);
		width: 100%;
		height: 100%;
	}
	.remove {
		cursor: pointer;
		position: absolute;
		right: 10px;
		top: 3px;
	}
	.btn {
		margin-top: 10px;
		margin-left: 10px;
		right: 2px;
		top: 1px;
	}
</style>
