<script>
	export let link = false;
	export let href = '';
</script>

{#if link}
	<button on:click={() => (window.location.href = href)} class="loginButton">
		<slot />
		<div class="circle"></div></button
	>
{:else}
	<button type="submit" class="loginButton"
		><slot />
		<div class="circle"></div>
	</button>
{/if}

<style>
	button,
	a {
		display: flex;
		flex-direction: row;
		width: max-content;
		padding: 0.3125rem 0.25rem 0.3125rem 0.625rem;
		align-items: center;
		gap: 0.5rem;
		border-radius: 12.5rem;
		border: 1px solid var(--text-light, #0c0c20);
		//background: rgba(245, 245, 245, 0.18);
		background: var(--bg-bright);
		box-shadow: 0px 4px 4px 0px rgba(12, 12, 32, 0.25);
		text-decoration: none;
		color: var(--text-light);
		font-size: 0.9rem;
	}

	button:hover {
		border-radius: 12.5rem;
		border: 1px solid var(--secondary);

		color: var(--text-light);
		& .circle {
			border: 1px solid var(--secondary);
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 1000ms;
		}
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 1000ms;
		outline: solid 2px var(--secondary, #4bffdf);
	}
	button:focus {
		border-radius: 12.5rem;
		border: 1px solid var(--text-light, #0c0c20);
		background: rgba(245, 245, 245, 0.2);
		/* box-shadow: 0px 4px 4px 0px rgba(12, 12, 32, 0.25); */
		outline: solid 2px var(--secondary, #4bffdf);
	}

	.circle {
		width: 1.25rem;
		height: 1.25rem;

		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
		border-radius: 12.5rem;
		border: 1px solid var(--text-light, #0c0c20);
		background: var(--secondary, #32b3b3);
	}
</style>
