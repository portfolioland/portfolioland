<!-- 
/**
 * @typedef {Object} Props
 * @property {boolean} publicState - The current state of the toggle
 * @property {Object} work - The work data, in wich the work ID is stored
 * @property {Object} labelProps - The label props
 * @property {string} label - The label text
 * @property {string} switchColor - The switch color
 * @property {string} toggledColor - The toggled color
 * @property {string} untoggledColor - The untoggled color
 */ -->

<script>
	import { enhance } from '$app/forms';
	import Toggle from '$lib/components/Buttons/toggle.svelte';

	export let publicState = false;
	export let work = {};
	export let labelProps = {};
	export let label = 'Public';
	export let switchColor = 'var(--primary)';
	export let toggledColor = 'var(--tertiary)';
	export let untoggledColor = 'var(--bg-bright)';
	export let small = false;
	export let disabled = false;
	export let hideLabel = true;
	let formElement = null;
	let on;
	let off;
</script>

<form action="?/publicState" method="POST" bind:this={formElement} use:enhance>
	<input type="hidden" name="publicState" bind:value={publicState} style="display: none" />
	<input type="hidden" name="workId" bind:value={work.id} style="display: none" />
</form>

<Toggle
	label="Public"
	hideLabel={false}
	bind:toggled={publicState}
	{switchColor}
	{untoggledColor}
	{small}
	{disabled}
	{labelProps}
	{toggledColor}
	
	on:toggle={() => {
		formElement.requestSubmit(), (publicState = !publicState);
	}}
/>

<style>
	form {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
	}
</style>
