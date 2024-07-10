<script>
	import Grid from 'svelte-grid';
	import { addNewItem, itemsPusher, remover } from './utils';
	import Tags from '$lib/components/Tags/tags.svelte';
	import Context from '../4_context_menü/context.svelte';
	import { cols, sharedColums, sharedRowHeight } from './config';

	import Pictures from '../2_image/pictures.svelte';
	import Paragraph from '../3_text/paragraph.svelte';
	import Headline from '../3_text/headline.svelte';
	import VideoEmbed from '../5_video/videoEmbed.svelte';

	import { enhance } from '$app/forms';
	import DeleteV_2 from '$lib/components/Delete/delete_v_2.svelte';
	import ImgTamplate from '../2_image/imgTamplate.svelte';
	import { writable } from 'svelte/store';

	export let data;
	export let form;

	$: form1 = form;
	export let closed = false;
	export let disableAnimation = true;
	//* From config.js
	let COLS = sharedColums;
	cols;
	export let toggle;
	export let index;
	let menuPosition;
	$: menuPos = menuPosition;
	let reactivItem = [];
	$: items = reactivItem;
	let defaultPos = { x: 60, y: 1 };

	data.locator.forEach((element) => {
		itemsPusher(COLS, reactivItem, element, true);
	});

	//* These are the Functions that handle the Addition and removal of Picture
	function addNEWPicture() {
		items = addNewItem(
			COLS,
			items,
			Pictures,
			'pictures',
			50,
			4,
			menuPos.x ? menuPos.x : defaultPos.x,
			menuPos.y ? menuPos.y : defaultPos.y
		);
		menuPos = { x: 0, y: 0 };
	}
	function addNEWh2() {
		items = addNewItem(
			COLS,
			items,
			Headline,
			'headlines',
			80,
			2,
			menuPos ? menuPos.x : defaultPos.x,
			menuPos ? menuPos.y : defaultPos.y
		);
		menuPos = { x: 0, y: 0 };
	}
	function addNEWP() {
		items = addNewItem(
			COLS,
			items,
			Paragraph,
			'paragraphs',
			40,
			2,
			menuPos ? menuPos.x : defaultPos.x,
			menuPos ? menuPos.y : defaultPos.y
		);
		menuPos = { x: 0, y: 0 };
	}
	function addNEWVideo() {
		items = addNewItem(COLS, items, VideoEmbed, 'video', 80, 4, 20, 10);
		menuPos = { x: 0, y: 0 };
	}
	function addImgTemplate() {
		items = addNewItem(COLS, items, ImgTamplate, 'pictures', 80, 4, 20, 10);
		menuPos = { x: 0, y: 0 };
	}

	function updateContent(id, newContent) {
		return (items = items.map((item) =>
			item.id === id ? { ...item, content: newContent } : item
		));
	}

	let adjustAfterRemove = false;
	function remove(item) {
		items = remover(item, COLS, items, adjustAfterRemove);
	}
	// ______________________________________________________________________________

	$: itemInput = JSON.stringify(items);

	// Clamp number between two values with the following line:
	let jahr = new Date().getFullYear();
	//console.log(jahr);

	let tag;
	let suggestion = data.tags;
	//console.log(data);

	let displayElement = false;
	//__________________________________________________________-
	const accumulatedChanges = writable({});
	function updateChanges(event) {
		const { name, value } = event.target;
		accumulatedChanges.update((prev) => ({ ...prev, [name]: value }));
	}
	let submit = () => {
		const form = document.getElementById('locatorForm' + data.work.id);
		if (form) {
			form.dispatchEvent(new Event('submit'));
		}
	};
	$: opacity = 100;
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<!--todo: das Todo Löschen  -->
<!-- <pre class="todo">Für das Tiptap bubble menu muss ich die drag and drop ausschalten wenn ein element aktiv ist </pre> -->
<!-- todo oberhabl löschen -->
<!-- 
<Context addItem={addNEWPicture} addP={addNEWP} headline={addNEWh2} bind:pos={menuPosition}
></Context> -->

<!-- <pre>{JSON.stringify(JSON.parse(itemInput), undefined, 2)}</pre>  -->
<!-- {JSON.stringify(menuPos)} -->

<form
	name="locator"
	id={'locatorForm' + data.work.id}
	method="POST"
	action="?/locatorUpdater"
	enctype="multipart/form-data"
	use:enhance
>
	<!-- * Die Daten werden im Formular gespeichert und übermittelt -->
	<input type="hidden" name="jahr" bind:value={jahr} />
	<input type="hidden" name="data" bind:value={itemInput} />
	<input type="hidden" name="tags" bind:value={tag} />
	<input type="hidden" name="cols" bind:value={COLS} />
	<input type="hidden" name="workID" bind:value={data.work.id} />

	<!-- Drag and Drop GridConrainer -->
	<div class="demo-container" data-sveltekit-keepfocus>
		<!-- <pre>{JSON.stringify(items, null, 2)}</pre> -->
		<Grid
			gap={[2, 2]}
			bind:items
			rowHeight={sharedRowHeight}
			let:item
			let:dataItem
			{cols}
			let:movePointerDown
			fastStart={disableAnimation}
			on:pointerdown={(e) => {
				menuPos = { x: e.clientX, y: e.clientY };
			}}
			on:pointerup={(e) => {
				menuPos = { x: 0, y: 0 };
			}}
			readOnly
		>
			<div class="demo-widget" style:opacity style:z-index={opacity * 100} style:outline="none">
				{#if toggle}
					<div class="dragger">
						{#if item.customDragger}
							<div on:pointerdown={movePointerDown}>✋ Drag me!</div>
						{/if}
					</div>
					<span>
						<form
							action="?/deleteItemInLocator"
							method="POST"
							id="deleteForm"
							use:enhance
							on:submit={(e) => remove(dataItem)}
						>
							<input type="hidden" name="id" value={dataItem.id} />
							<input type="hidden" name="type" value={dataItem.type} />
							<button style="border: none;outline: none" class="remove"
								><DeleteV_2 icon={true} />
								{item.x}
								{item.y}</button
							>
						</form>
					</span>
				{/if}

				<!-- * item.irgendwas sind die Werte die geupdated werden aufgrund der positioniereung im grid. dataItem sind die Daten die ich reingebe in den Functionen add__() -->

				<svelte:component
					this={dataItem.component}
					id={dataItem.id}
					content={dataItem.content}
					updateContent={(newContent) => updateContent(dataItem.id, newContent)}
					altTxt={dataItem.altTxt}
					credits={dataItem.credits}
					contenteditable={toggle}
				/>

				<!-- <pre>{JSON.stringify(item,null,2)}</pre> -->
			</div>
		</Grid>
	</div>
</form>
<!-- Menüelement -->
<div class="menuwrapper" id="menu">
	<button on:click={addNEWPicture}>Add Picture</button>
	<button on:click={addNEWh2}>Add Headline</button>
	<button on:click={addNEWP}>Add Paragraph</button>
	<button on:click={addNEWVideo}>Add video</button>
	<button on:click={addImgTemplate}>Template</button>
	<button on:click={submit}>Submit</button>
	<!-- <button on:click={addNEWRandom}>Add random (x=0,y=0)</button> -->

	<!-- <label>
			<input type="checkbox" bind:checked={adjustAfterRemove} />
			Adjust elements after removing an item
		</label> -->
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
</div>

<!-- Menuelement ende -->
<!-- <pre>{JSON.stringify(items, null, 2)}</pre> -->

<style>
	form {
		width: 100%;
		min-height: 80vh;
	}
	span {
		color: red;
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
	}

	.menuwrapper {
		outline: var(--button-border);
		background-color: rgb(251 191 36);

		padding: 0.5rem;

		display: flex;
		justify-content: center;
		align-content: center;
		align-self: end;
		justify-self: end;

		gap: 1rem;
		width: 100%;
	}

	.dragger {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
		border: 0.1rem solid var(--text-light);
		border-radius: 200rem;

		cursor: default;
		user-select: none;
		color: var(--text-light);
		line-height: 1rem;
		text-align: center;

		width: fit-content;
		padding-left: 0.5rem;
		padding-right: 0.5rem;

		margin-top: 10px;
		border-radius: 3px;
		position: absolute;
		left: 101%;
		bottom: 0;
		z-index: 999;
		font-size: clamp(0.6rem, 2vmin, 1rem);
		overflow: hidden;
		&:hover {
			transition: all 1s ease-in;
		}
	}
	.resizer {
		position: absolute;
		bottom: 5px;
		right: 5px;
		cursor: move;
		background-color: rgb(251 191 36);
	}
</style>
