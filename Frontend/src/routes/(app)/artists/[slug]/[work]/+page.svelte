<script>
	/** @type {import('./$types').PageData} */

	import LocatorViewerSvelteGridExtended from '$lib/components/Profil_Work_SiteBuilder/1_Locator/LocatorSvelte-grid-extended/locatorViewerSvelte-grid-extended.svelte';
	export let data;
</script>

{#await data}
	<p>loading...</p>
{:then data}
	<LocatorViewerSvelteGridExtended {data} />
	<div style="width: 100vw;height: 7vh; background-color: var(--bg-light)"></div>
	<div class="workFooter">
		<div class="info">
			<h2>
				Title:
				{' ' + data.work}
			</h2>
			<p>
				Artists:
				{#if data.artist}
					{#each data.artist as artists}
						<a href="/artists/{artists}"> {artists + ' '}</a>
					{/each}
				{:else}
					<p>No artists available</p>
				{/if}
			</p>
			<p>Jahr: {data.jahr}</p>
			<div class="tags">
				{#each data.tag as tag}
					<!-- <TagDisplay {tag} /> -->

					<div class="tag"><a href="/tags/{tag}">{tag}</a></div>
				{/each}
			</div>
		</div>
	</div>
{/await}

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
	.workFooter {
		width: 100vw;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border: solid 0.1rem var(--text-light);
		padding-left: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.3rem;

		background-color: var(--bg-light);
		& .tags {
			margin-right: 1rem;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			& a {
				text-decoration: none;
				color: var(--text-light);
				&:hover {
					color: var(--tertiary);
					transition-property: all;
					transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
					transition-duration: 1000ms;
				}
			}
		}
	}
</style>
