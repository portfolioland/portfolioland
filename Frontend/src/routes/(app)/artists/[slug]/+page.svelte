<script>
	import LocatorViewer from '$lib/components/Profil_Work_SiteBuilder/1_Locator/LocatorSvelte-grid-extended/locatorViewerSvelte-grid-extended.svelte';
	import TagDisplay from '$lib/components/Tags/tagDisplay.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
	<header>
		<h1>
			Portfolio of {data.artistData[0].name}
			{#if data.artistData[0].pronomen}
				({data.artistData[0].pronomen})
			{/if}
		</h1>
	</header>
	<article>
		<section class="works">
			<h2>List of works:</h2>
			<ul>
				{#each data.locator.slice(0, 5) as locator}
					<li>
						<a
							href={`/artists/${data.artistData[0].name}#${locator.work.id}`}
							title={locator.work.title}
						>
							{locator.work.title} - {locator.work.jahr}</a
						>
					</li>
				{/each}
			</ul>
		</section>
		{#if data.locator && data.locator.some((loc) => loc.work.expand.tag && loc.work.expand.tag.length > 0)}
			<section class="tags">
				<!-- <h2>Liste der Tags:</h2> -->
				<ul>
					{#each data.locator.slice(0, 5) as locator}
						{#if locator.work.expand.tag && locator.work.expand.tag.length > 0}
							{#each locator.work.expand.tag as tag}
								<li>
									<TagDisplay tag={tag.title} />
								</li>
							{/each}
						{/if}
					{/each}
				</ul>
			</section>
		{/if}
	</article>
	{#each data.locator as locator}
		<div id={locator.work.id}>
			<LocatorViewer data={locator} />
		</div>

		<div class="workFooter">
			<div class="info">
				<h2>
					Title: <a href="/artists/{locator.work.expand.artists[0].name}/{locator.work.title} "
						>{locator.work.title}</a
					>
				</h2>
				<p>
					Artists:
					{#each locator.work.expand.artists as artists}
						<a href="/artists/{artists.name}"> {artists.name + ' '}</a>
					{/each}
				</p>
				<p>Jahr: {locator.work.jahr}</p>
			</div>
			<div class="tags">
				{#if locator.work.expand.tag && locator.work.expand.tag.length > 0}
					{#each locator.work.expand.tag as tag}
						<TagDisplay tag={tag.title} />
					{/each}
				{/if}
			</div>
		</div>
	{/each}
</main>

<!-- {#if data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/if} -->

<style>
	main {
		margin: 1rem;
	}
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: solid 0.1rem var(--text-light);
	}
	article {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		border-bottom: solid 0.1rem var(--text-light);
	}
	section {
		display: flex;
		gap: 0.25rem;
		flex-direction: column;

		width: 100%;

		& ul {
			list-style-type: none;
			display: flex;
			flex-direction: row;

			flex-wrap: wrap;
			text-indent: 0;
		}

		& li {
			margin-bottom: 0.5rem;
			margin-left: 0.5rem;
			flex-direction: row;
			justify-content: flex-start;
			text-indent: 0;
			&:last-child {
				margin-bottom: 0;
			}
			&:hover {
				color: var(--tertiary);
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				transition-duration: 1000ms;
			}
		}

		& a {
			color: var(--text-light);
			text-decoration: none;
			&:hover {
				color: var(--tertiary);
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				transition-duration: 1000ms;
			}
		}
	}

	ul li {
		list-style-type: none;
		text-indent: 0;
		padding-left: 0;
	}

	.workFooter {
		height: 10vh;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 0.1rem var(--text-light);
	}
	.info {
		display: flex;
		flex-direction: column;
		margin-left: 1rem;
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

		& p {
			color: var(--text-light);
		}
	}
	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		flex-flow: row wrap;

		max-width: 500px;
		gap: 0.5rem;
	}
	@media only screen and (max-width: 460px) {
		article {
			flex-direction: column;

			width: 100%;
		}
	}
	/* 
	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		flex-flow: row wrap;
		justify-content: flex-start;
		margin-left: 1rem;
		margin-bottom: 1rem;
	}

	.locatorWrapper {
		width: 100vw;
		min-height: 90vh;
		border-bottom: 0.1rem solid var(--text-light);
		gap: 2rem;
	}

*/
</style>
