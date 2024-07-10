<script>
	export let tag = '';
	export let tagItem = '';
	export let tagInput = '';
</script>

{#if tagItem === tag}
	<div id="activeTag" class="tag">
		<a href="/tags/{tag}">{tag}</a>
	</div>
{:else if tagInput === tag}
	<div id="activeTag" class="tag">
		{tag}
		<slot />
	</div>
{:else}
	<div class="tag"><a href="/tags/{tag}">{tag}</a></div>
{/if}

<style>

	.tag {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: fit-content;
		font-size: 0.8rem;
		margin-right: 0.33rem;
		padding: 0.15rem 0.25rem;
		border: solid 0.1rem var(--text-light);
		border-radius: 20rem;
		color: var(--text-light);
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 1000ms;
		background-color: var(--bg-bright);

		&:hover {
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 1000ms;
			background-color: var(--tertiary);
			color: var(--text-light);
		}

		& a {
			text-decoration: none;
			color: var(--text-light);
		}
	}
	span {
		white-space: nowrap;
	}
</style>
