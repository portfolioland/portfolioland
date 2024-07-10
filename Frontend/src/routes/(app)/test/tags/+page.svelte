<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Tags from '$lib/components/Tags/tags.svelte';
	import { SortableList } from '@jhubbardsf/svelte-sortablejs';

	let tagslist = ['foto', 'dia', 'video', 'Text'];
	let tags;
	let opacity = 0.5;
	let setData
</script>

<Tags bind:value={tags} list={tagslist} />

<pre>{JSON.stringify(tags, null, 2)}</pre>

<input />

<input class="range" type="range" bind:value={opacity} min="0" max="1" step="0.1" />
<div style:opacity>{opacity}</div>

<SortableList multiDragClass="multi-drag" store={setData} >
	{#each tagslist as tag, index}
		<div
			on:pointerenter={() => (opacity = 1)}
			on:pointerleave={() => (opacity = 0.5)}
			style:opacity
			style:cursor="pointer"
		>
			{tag}
			{setData}
		</div>
		
	{/each}
</SortableList>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: inherit;
	}
	input {
		display: flex;
		justify-content: center;
		align-self: center;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;

		cursor: pointer;

		padding: 0.3rem;

		border-radius: 20rem;

		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 1000ms;
		&:hover {
			outline: 0.2rem solid var(--tertiary);
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 1000ms;
		}
		&:focus {
			outline: 0.1rem solid var(--tertiary);
		}
	}
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background-color: transparent;
		cursor: pointer;
		border: none;
	}
</style>
