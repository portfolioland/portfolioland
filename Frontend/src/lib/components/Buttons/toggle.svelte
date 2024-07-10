<script>
	import { ToggleCore } from 'svelte-toggle';

	export let label = 'test';
	export let toggled = false;
	export let labelProps = {};
	export let switchColor = 'var(--text-light)';
	export let toggledColor = 'var(--tertiary)';
	export let togglePrivate = 'var(--secondary)' || '#4bffdf';
	export let untoggledColor = 'var(--bg-bright)';
	export let disabled = false;
	export let hideLabel = true;
	export let dispatcherON = true;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	$: dispatch('toggle', toggled);
</script>

{#if dispatcherON}
	<ToggleCore bind:toggled let:label={labelProps} let:button>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label {...labelProps} class:hideLabel>{label}</label>
		<button
			{...$$restProps}
			{...button}
			style:color={toggled ? switchColor : togglePrivate}
			style:background-color={untoggledColor}
			{disabled}
			on:click
			on:click={() => (toggled = !toggled)}
			on:focus
			on:blur
		/>
	</ToggleCore>
{:else}
	<ToggleCore bind:toggled let:label={labelProps} let:button>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<div style="gap: 0.5rem">
			<label {...labelProps} class:hideLabel>{label}</label>
			<button
				{...$$restProps}
				{...button}
				style:color={switchColor}
				style:background-color={toggled ? toggledColor : untoggledColor}
				{disabled}
				on:click|preventDefault={() => (toggled = !toggled)}
				on:focus
				on:blur
				on:keypress|preventDefault
			/>
		</div>
	</ToggleCore>
{/if}

<style>
	/**
  * Visually hide element without breaking screen readers
  * https://a11yproject.com/posts/how-to-hide-content/
  */
	.hideLabel {
		position: absolute;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px 1px 1px 1px);
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap;
	}

	button {
		position: relative;
		padding: 0 0.25rem;
		border: 0;
		border-radius: 1rem;
		height: 1.35rem;
		width: 2.5rem;
		font: inherit;
		color: inherit;
		line-height: inherit;
		border: var(--button-border, 0.1rem solid var(--text-light, #0c0c20));
		//background-color: var(--button-background, var(--bg-bright, #fff));
		transition: background-color 0.2s ease-out;
	}

	button:focus {
		border-radius: 12.5rem;
		border: 1px solid var(--text-light, #0c0c20);
		background: rgba(245, 245, 245, 0.2);
		/* box-shadow: 0px 4px 4px 0px rgba(12, 12, 32, 0.25); */
		outline: solid 2px var(--tertiary, #4bffdf);
	}

	button:not([disabled]) {
		cursor: pointer;
	}

	button[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	button:before {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 0.125rem;
		margin: auto;
		height: 1rem;
		width: 1rem;
		text-align: center;
		border-radius: 50%;
		background-color: currentColor;
		transition: transform 150ms ease-out;
		outline: var(--button-border, 0.1rem solid var(--text-light, #0c0c20));
	}

	button[aria-checked='true']:before {
		transform: translateX(1.1rem);
	}

	button.small {
		height: 1rem;
		width: 1.75rem;
	}

	button.small:before {
		height: 0.75rem;
		width: 0.75rem;
	}

	button.small[aria-checked='true']:before {
		transform: translateX(0.75rem);
	}

	div {
		display: flex;
		align-items: center;
	}

	span {
		margin-left: 0.5rem;
	}
</style>
