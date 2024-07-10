<script>
	import Grid from 'svelte-grid';
	import { cols, sharedColums, sharedRowHeight } from './config';
	import { itemsPusher } from './utils';

	export let data;

	const COLS = sharedColums;
	cols;

	let items = [];
	// * Add Elements for the Locator viewer
	data.locator.forEach((element) => {
		itemsPusher(COLS, items, element, false);
	});
</script>

<div class="demo-container">
	<Grid
		gap={[2, 2]}
		bind:items
		rowHeight={sharedRowHeight}
		let:item
		let:dataItem
		{cols}
		fastStart={true}
	>
		<div class="demo-widget">
			<!-- * item.irgendwas sind die Werte die geupdated werden aufgrund der positioniereung im grid. dataItem sind die Daten die ich reingebe in den Functionen add__() -->

			<svelte:component
				this={dataItem.component}
				id={dataItem.id}
				content={dataItem.content}
				contenteditable={false}
				altTxt={dataItem.altTxt}
				credits={dataItem.credits}
			/>
		</div>
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
