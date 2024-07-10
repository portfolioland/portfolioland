<script>
	import { flip } from 'svelte/animate';
	import TagDisplay from './tagDisplay.svelte';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let value = []; // tag list
	export let list = []; // a list of tag suggestion
	let input = ''; // input value

	// pressed checks keyboard event for comma or Enter key.
	// If found, adds 'value' in the tag list.
	// REM: On the 'blur' event, if we exit the field with
	//      someting inside, consider it as a tag.
	function pressed(ev) {
		// Check if conditions are met to do something.
		// If not, exit as early as possible.
		if (ev.type !== 'blur' && ev.key !== ',' && ev.key !== 'Enter') return;

		// Clean the remaining comma in input.
		input = input.replace(',', '');

		// If nothing left, we do nothing and exit.
		if (input === '') return;

		//If the input is already in value, we do nothing
		const isTagAlreadyPresent = value.some(
			(tag) => tag.toLowerCase().trim() === input.toLowerCase().trim()
		);
		if (isTagAlreadyPresent) {
			input = '';
			return;
		}

		// If we are here, we can add the tag to our list...
		// ... and clean the input for the next one.
		value = [...value, input];
		input = '';
		limitLength();
	}

	// del deletes the 'idx' entry from the tag list.
	function del(idx) {
		value.splice(idx, 1); // Remove the idx'th entry.
		value = value; // Refresh for reactivity.
	}

	// limitLength limits the length of tags that can be in the array to 5 (0-4)
	function limitLength() {
		let maxNumber = 4;
		let arrLength = value.length;
		if (arrLength > maxNumber) {
			value.splice(0, arrLength - maxNumber);
		}
	}
</script>

<div class="tags">
	<input
		id="tagslistinput"
		list="tag_suggestion"
		maxlength="30"
		minlength="3"
		on:blur={pressed}
		on:keyup={pressed}
		on:change={limitLength}
		bind:value={input}
		on:keydown={(e) => {
			const { key, shiftKey } = e;
			if (key === 'Enter') {
				e.preventDefault();
				pressed(e);
			} else if (key === 'Backspace' && input === '') {
				del(shiftKey ? 0 : value.length - 1);
			} else if (key === 'Delete' && input === '') {
				del(shiftKey ? value.length - 1 : 0);
			} else {
				pressed(e);
			}
		}}
		placeholder="Tags"
	
	/>
	<p>select or enter a tag and confirm with enter</p>

	<div id="taglist">
		{#each value as t, i (i)}
			<div
				animate:flip={{ delay: 50, duration: 1000 }}
				in:fade={{ delay: 5, duration: 1000 }}
				out:fade={{ duration: 250 }}
			>
				<TagDisplay tag={t} tagInput={t}>
					<a
						id="del"
						class="del"
						style="font-size: 0.8rem; font-weight: bold; margin-left: 0.25rem"
						href="#del"
						on:click={() => del(i)}>⨉</a
					></TagDisplay
				>
			</div>
		{/each}
	</div>

	<datalist id="tag_suggestion">
		{#each list as ts}
			<option>{ts}</option>
		{/each}
	</datalist>
</div>

<style>
	.tags {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	div {
		gap: 0.25rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	input {
		border: solid 0.01rem var(--text-light);
		border-radius: 0.5rem;
		padding: 0.25rem;
		width: 100%;
	}
</style>
