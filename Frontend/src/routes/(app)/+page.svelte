<script>
	import { PUBLIC_PB_URL } from '$env/static/public';
	import Footer from '$lib/components/Footer/footer.svelte';
	import ImgDisplay from '$lib/components/Frontpage/imgDisplay.svelte';
	import PreviewWork from '$lib/components/Frontpage/previewWork.svelte';
	import Search from '$lib/components/Search/search.svelte';
	export let data;
	export let form;

	import TagDisplay from '$lib/components/Tags/tagDisplay.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	let result = form?.results;
	$: results = result;
	let showcaseArtist = '';
	let showcaseData = {};
</script>

<header>
	<h1>Welcome to Portfolioland</h1>
	<Search bind:fetchedData={result} />
</header>
{#if results?.results.length > 0}
	<div
		class="searchResults"
		style="border-bottom: solid 0.1rem var(--text-light);  padding-top: 1rem;"
		transition:fly={{ y: -200, duration: 2000 }}
	>
		<h2>Search Results:</h2>
		<div class="grid">
			{#each results.results as work}
				<article class="card">
					<PreviewWork {work} />
				</article>
			{/each}
		</div>
	</div>
{:else if results?.results?.length === 0}
	<div
		class="searchResults"
		transition:fly={{ y: -200, duration: 2000 }}
		style="width: 100vw; height: 100vh"
	>
		<h2>No results found</h2>
	</div>
{/if}
<main>
	<section style="display: flex; gap: 1rem">
		<article class="showcase">
			<ImgDisplay bind:showcaseArtist bind:showcaseData />
		</article>
		<section class="about">
			<h2>About</h2>
			<p>
				Portfolioland is a showcase-platform for students of the Kunsthochschule Kassel.
				<br />Here, they can structure, sort, categorize, share and present their work to a wider
				audience.
				<br />The works on Portfolioland are diverse and reflect the creativity and talent of the
				students.
				<br />Whether it's paintings, sculptures, installations, or digital media, Portfolioland
				provides a space for students to showcase their skills and connect with a wider audience.
			</p>

			<h2>Feature</h2>
			<p>
				The showcased work is named <a href="/artists/{showcaseArtist}/{showcaseData.title}"
					>"{showcaseData.title}"</a
				>
				and was created by the artist <a href="/artists/{showcaseArtist}">{showcaseArtist}</a>
				in the year {showcaseData.jahr}.
				<br />
				Get more information about the work
				<a href="/artists/{showcaseArtist}/{showcaseData.title}">{showcaseData.title}</a>
			</p>
			{#if showcaseData.expand?.tag[0].title}
				<TagDisplay tag={showcaseData.expand?.tag[0].title} />
			{/if}
		</section>
	</section>
</main>
<!-- This is the search results form in the app page -->

<div class="appWrapper" style="border: none; margin-bottom: 5rem">
	<h2
		style=" margin-bottom: 2rem; border-bottom: solid 0.1rem var(--text-light); border-top: solid 0.1rem var(--text-light); padding: 0.5rem;"
	>
		Newest works
	</h2>
	<div class="grid">
		{#each data.work.slice(0, 10) as work}
			<article class="card">
				<PreviewWork {work} />
			</article>
		{/each}
	</div>
</div>
<!-- <div style="height: 5rem; border-bottom: solid 0.1rem var(--text-light);"> </div> -->
<Footer />

<style>
	main a {
		text-decoration: none;
		color: var(--text-light);
		text-shadow: var(--tertiary) 0.01rem 0.01rem 0.1rem;
	}
	header {
		width: 100dvw, 100vw;
		position: sticky;
		top: 0;

		z-index: 10;
		padding: 0.5rem;
		display: flex;
		justify-content: space-between;
		border-bottom: solid 0.1rem var(--text-light);
		background-color: var(--bg-light);
		gap: 1rem;
		flex-wrap: wrap;
		& h1 {
			font-size: 1.5rem;
			margin: 0;
		}
	}
	.searchResults {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		overflow: auto;
		border-bottom: solid 0.1rem var(--text-light);
	}
	.showcase {
		display: flex;
		flex-direction: column;

		width: 100%;
		max-width: 1000px;
		max-height: 500px;
		overflow: hidden;
	}
	.about {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-right: 1rem;
		margin-top: 1rem;
		min-width: 500px;
		flex-wrap: wrap;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 3fr));
		grid-template-rows: repeat(auto-fit, minmax(500px, 3fr));
		gap: 0.5rem;
		overflow: auto;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 1rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 100%;

		aspect-ratio: 1 / 1;
	}
	.presenter {
		display: flex;
		justify-content: center;
		align-items: center;

		flex-direction: column;
		gap: 2rem;
		width: 100%;
		overflow-y: scroll;
	}
	.presenterElement {
		width: 96%;
		height: 20rem;
		overflow-x: hidden;
		border-left: dashed 0.1rem var(--text-light);
		justify-self: center;
		display: flex;
		flex-direction: row;
		padding-left: 2%;

		align-items: center;
		gap: 0.5rem;
		border: solid 2px var(--text-light);

		& .tags {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			width: 100%;
			justify-content: flex-start;
			margin-left: 1rem;
			margin-bottom: 1rem;

			gap: 0.5rem;
		}
		& h2 {
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			margin-left: 2%;
			white-space: pre;
		}
	}
	.appWrapper {
		margin-left: 1%;
		margin-right: 1%;

		//background-color: rgb(248 113 113);
		gap: 0.5rem;
		margin-top: 1rem;
		border: solid 0.1rem var(--text-light);
	}
	/* .appWrapper{
		margin-left: 1%;
		margin-right: 1%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
		border: solid 0.1rem var(--text-light);
	
		gap: 0.5rem;
	} */
	span {
		white-space: pre;
	}
	:global(.todo) {
		color: orange;
	}

	@media (max-width: 745px) {
		header {
			display: flex;
			justify-content: center;
		}
		header h1 {
			font-size: calc(2vw + 1rem);
			align-items: center;
		}
	}

	@media (max-width: 600px) {
		.grid {
			display: flex;
			flex-direction: column;
		}
	}
</style>
