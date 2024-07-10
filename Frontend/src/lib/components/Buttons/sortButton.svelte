<script>
	export let handleClick = () => {};
	export let buttonText = 'sort';
	export let isActive = false;
	export let isAscending = true
	import { fade } from 'svelte/transition';
</script>

{#if isActive}
	{#if isAscending}
		<button id="sortasc" on:click={handleClick} aria-label="sort ascending" transition:fade={{ duration: 2000 } }> ⇅ </button>
	{:else}
		<button id="sortdesc" on:click={handleClick} aria-label="sort descending"> ⇅ </button>
	{/if}
{:else}
	<button on:click={handleClick}>
		{buttonText}
	</button>
{/if}

<style>
	#sortdesc {
		background: var(--tertiary);
		//box-shadow: 0px -5px 5px var(--tertiary);
	}
	#sortasc {
		background: var(--tertiary);
		//box-shadow: 0px 5px 5px var(--tertiary);
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	button {
		background-color: transparent;
		border: none;
		display: flex;
		justify-content: center;
		align-self: center;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;

		font-weight: 700;
		font-size: 0.875rem;
		color: var(--text-light);
		cursor: pointer;
		border: 0.1rem solid var(--text-light);
		padding: 0.3rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		border-radius: 20rem;

		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 1000ms;
		&:hover {
			color: var(--tertiary);
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 1000ms;

			& svg path {
				fill: var(--tertiary);
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				transition-duration: 1000ms;
			}
		}
	}
	
</style>
