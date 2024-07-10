<script>
	import Tags from '$lib/components/Tags/tags.svelte';
	import Grid, { GridItem } from 'svelte-grid-extended';
	import Headline from '$lib/components/Profil_Work_SiteBuilder/3_text/headline.svelte';
	import Paragraph from '$lib/components/Profil_Work_SiteBuilder/3_text/paragraph.svelte';
	import Pictures from '$lib/components/Profil_Work_SiteBuilder/2_image/pictures.svelte';

	import { enhance } from '$app/forms';
	import DeleteV_2 from '$lib/components/Delete/delete_v_2.svelte';

	import {
		itemSize,
		rows
	} from '$lib/components/Profil_Work_SiteBuilder/1_Locator/LocatorSvelte-grid-extended/config.js';
	import TipTap from '../../0000_Utils_TipTapProse/TipTap.svelte';
	import TogglePublicState from '$lib/components/Profil/0001_Menu/TogglePublicState.svelte';
	import TagDisplay from '$lib/components/Tags/tagDisplay.svelte';

	export let data;
	export let viewMode = false;
	export let toggle = false;
	export let form;

	$: items = data.locator;

	function remove(id) {
		items = items.filter((i) => i.id !== id);
		const filteredItems = items.filter((i) => i.id !== id);
		data.locator = [...filteredItems]; // This should prevent the grid from rearranging the items.
	}

	let gridController;
	let newITEM = false;

	/**
	 * Adds a new item to the items array.
	 *
	 * This function creates a new item with a random id, width and height, and
	 * coordinates determined by the `gridController`. The new item is added to
	 * the `items` array and also updated in the `data.locator` object.
	 */
	function addNewItem(type) {
		// Define the dimensions of the new item
		const types = {
			paragraphs: {
				w: 100,
				h: 20
			},
			headlines: {
				w: 200,
				h: 20,
				content: 'Default Content'
			},
			pictures: {
				w: 250,
				h: 150
			}
		};
		const { w, h } = types[type];

		// Get the next available position in the grid
		const newPosition = gridController.getFirstAvailablePosition(w, h);

		// Create the new item with the determined coordinates and a random id
		const id = crypto.randomUUID();
		const newItem = {
			id,
			w,
			h,
			...newPosition,
			content: '',
			type,
			newEntries: true
		};

		// Add the new item to the items array and update the data.locator object
		items = [...items, newItem];
		data.locator = items;
	}
	let innerWidth = 0;
	$: cols = innerWidth / 3;

	/**
	 * Function to submit the form.
	 *
	 * This function dispatches a 'submit' event to the form element with the id
	 * equal to `data.work.id`. If the form element is found, the event is
	 * dispatched.
	 */
	let submit = (DOMid) => {
		// Get the form element with the id equal to `data.work.id`
		const form = document.getElementById(DOMid);

		// If the form element is found, dispatch a 'submit' event to it and prevent the page reload
		if (form) {
			const event = new Event('submit');

			form.dispatchEvent(event);
		}
		data.locator = items;
	};

	let jahr = new Date().getFullYear();
	let tag;
	let suggestion = data.tags;
</script>

<!-- <div style="display: flex; justify-content: space-between; align-items: center">
	<pre>{JSON.stringify(data.locator, null, 2)}</pre>
	<pre>{JSON.stringify(items, null, 2)}</pre>
</div> -->

<svelte:window bind:innerWidth />
<!-- {innerWidth} -->
<!--* Das Formular wird gesendet durch den Button über die Funktion submit, die die data.Worker.id braucht  -->
<!-- {#if !viewMode}
	<Jumper size="60" color="black" unit="px" duration="1s" />
{/if} -->
<main>
	<form
		name="locatorUpdater"
		id={data.work.id}
		method="POST"
		action="?/locatorUpdater"
		on:submit|preventDefault
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ update }) => {
				await update();
				items = items;
			};
		}}
	>
		<!-- * Die Daten werden im Formular gespeichert und übermittelt -->
		<input type="hidden" name="jahr" bind:value={jahr} />
		<!-- <input type="hidden" name="data" bind:value={itemInput} /> -->
		<input type="hidden" name="tags" bind:value={tag} />
		<!-- <input type="hidden" name="cols" bind:value={COLS} /> -->
		<input type="hidden" name="workID" bind:value={data.work.id} />

		<!-- Drag and Drop GridConrainer -->
		<Grid
			{itemSize}
			rows={0}
			{cols}
			collision="none"
			class={toggle ? 'grid' : 'gridViewer'}
			gap={1}
			readOnly={!toggle}
			bind:controller={gridController}
			bounds={true}
			on:pointerdown={(e) => e.stopPropagation()}
		>
			{#each items as { id, x, y, w, h, type, content, newEntries }, i}
				<!-- <pre>{JSON.stringify({ id, x, y, w, h, type, content, newEntries }, null, 2)}</pre> -->
				<GridItem
					{id}
					bind:x
					bind:y
					bind:w
					bind:h
					class={toggle ? 'grid-item' : 'grid-item-watcher'}
					activeClass="grid-item-active"
					previewClass="preview"
					on:pointerdown={(e) => e.stopPropagation()}
					on:change={(e) => {
						console.log(e);
						console.log('change');
					}}
				>
					{#if toggle}
						<form
							action="?/deleteItemInLocator"
							method="POST"
							id="deleteForm"
							use:enhance
							on:submit={() => {
								remove(id);
							}}
							class="remove"
						>
							<input type="hidden" name="id" value={id} />
							<input type="hidden" name="type" value={type} />
						</form>
						<button
							style="border: none;outline: none"
							class="remove"
							on:pointerdown={(e) => e.stopPropagation()}
							on:click={() => submit('deleteForm')}
							><DeleteV_2 icon={false} />
						</button>
					{/if}
					<!-- <div class="item">{id} {data.work.title} {type} {content}</div> -->
					{#if type == 'headlines'}
						<Headline
							workID={data.work.id}
							headlineID={id}
							bind:content
							contenteditable={toggle}
							{newEntries}
						/>
					{/if}
					{#if type == 'paragraphs'}
						<Paragraph
							workID={data.work.id}
							headlineID={id}
							bind:content
							contenteditable={toggle}
							{newEntries}
						/>
					{/if}
					{#if type == 'pictures'}
						<Pictures {content} {id} credits="" submit={() => submit(data.work.id)} />
					{/if}

					<input type="hidden" form={data.work.id} name="ItemID-{id}" {id} bind:value={id} />
					<input type="hidden" form={data.work.id} name="Item-x-{id}" {id} bind:value={x} />
					<input type="hidden" form={data.work.id} name="Item-y-{id}" {id} bind:value={y} />
					<input type="hidden" form={data.work.id} name="Item-w-{id}" {id} bind:value={w} />
					<input type="hidden" form={data.work.id} name="Item-h-{id}" {id} bind:value={h} />
					<input type="hidden" form={data.work.id} name="Item-type-{id}" {id} bind:value={type} />
					<input
						type="hidden"
						form={data.work.id}
						name="Item-content-{id}"
						{id}
						bind:value={content}
					/>
					<input
						type="hidden"
						form={data.work.id}
						name="Item-new-{id}"
						{id}
						bind:value={newEntries}
					/>
				</GridItem>
				<!-- Die Daten für das Formular, für jedes GridItem -->
			{/each}
		</Grid>
	</form>

	<!-- <pre>{JSON.stringify(data.work, null, 2)}</pre> -->


	<form
		action="?/updateWork"
		method="POST"
		use:enhance
		on:submit={() => (toggle = false)}
		id="menu"
	>
		<div class="menuwrapper" id="menu">
			{#if !toggle}
				<h2>
					Title: <a href="/artists/{data.work.artists[0]}/{data.work.title}">
						{' ' + data.work.title}</a
					>
				</h2>
				<p>
					Artists:
					{#each data.work.artists as artists}
						<a href="/artists/{artists}"> {artists + ' '}</a>
					{/each}
				</p>
				<p>Jahr: {data.work.jahr}</p>
				<div class="togglePublicState">
					<TogglePublicState work={data.work} publicState={data.work.public} />
				</div>
				<div class="tags">
					{#each data.work.tag as tag}
						<TagDisplay {tag} />
					{/each}
				</div>
				test
			{:else}
				<h2 style="display: flex; gap:1rem">
					Title:
					<TipTap
						content={data.work.title}
						updateContent={(title) => (data.work.title = title)}
						editable={true}
					/>
					<input type="hidden" name="title" value={data.work.title} style="display: none" />
					<input type="hidden" name="id" value={data.work.id} style="display: none" />
				</h2>
			{/if}

			{#if toggle}
				<!-- Menüelement -->{#if !viewMode}

					<button on:click|preventDefault={() => addNewItem('paragraphs')}>Add Paragraph</button>
					<button on:click|preventDefault={() => addNewItem('headlines')}>Add Headline</button>
					<button on:click|preventDefault={() => addNewItem('pictures')}>Add Image</button>

					<label for="jahr"
						>Entstehungsjahr: <input
							type="number"
							bind:value={jahr}
							max={2024}
							min={1970}
							placeholder="Entstehungsjahr"
						/></label
					>
					<div class="tags">
						<Tags list={suggestion} bind:value={tag} />
					</div>
					<!-- <input type="submit" name="form" id="form" form="locatorForm" value="Save" /> -->
					<button on:click={() => submit(data.work.id)}>Submit</button>
				{/if}
			{/if}
		</div>
	</form>
</main>

<style>
	form {
		width: 100%;

		position: relative;
		bottom: 0;
	}
	span {
		color: red;
	}
	main {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow-y: scroll;
	}
	#menu {
		position: sticky;
		bottom: 0;

		width: 100%;
		background-color: var(--bg-light);
	}
	.demo-widget {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		outline: dotted 1.5px black;
		z-index: -1;
		opacity: inherit;
	}

	.demo-container {
		max-width: 100dvw, 100vw;
		width: 100%;
		& button {
			background-color: transparent;

			border: none;
		}
	}

	.remove {
		cursor: pointer;
		position: absolute;
		right: -1rem;
		top: -2rem;
		user-select: none;
		color: var(--error-color);
		outline-style: solid 1px white;
		&:hover {
			text-shadow: 1px 1px 2px pink;
		}
		background: transparent;
	}

	.menuwrapper {
		outline: var(--button-border);
		//background-color: rgb(251 191 36);

		padding: 0.5rem;

		display: flex;
		justify-content: center;
		align-content: center;
		align-self: end;
		justify-self: end;

		gap: 1rem;
		width: 100%;
		z-index: 9999;
		border: solid 0.1rem var(--text-light);
	}

	:global(.grid-item) {
		display: flex;
		justify-content: center;
		align-items: center;

		opacity: 1;
		border: dashed 1px var(--text-light);
		width: fit-content;

		-webkit-box-shadow:
			2px 5px 16px 0px #0b325e,
			5px -3px 0px 13px rgba(0, 0, 0, 0);
		box-shadow:
			2px 5px 16px 0px #0b325e,
			5px -3px 0px 13px rgba(0, 0, 0, 0);
	}

	:global(.grid-item-watcher) {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		width: fit-content;
		height: fit-content;
		background: transparent;
	}

	:global(.item .grid-item-active) {
		opacity: 0.1;
	}

	:global(.grid) {
		//outline: dashed 2px red;
		padding-bottom: 2rem;
		//width: 50vw !important;

		/* opacity: 0.7; */

		width: 100vw !important;
		overflow: hidden;
	}
	:global(.gridViewer) {
		width: 100vw !important;
		overflow: none;
	}
	:global(.preview) {
		opacity: 0.7;
		background-color: var(--tertiary);
		box-shadow: 0 0 0 1px var(--text-light);
	}
</style>
