<script>
	import { onMount } from 'svelte';
	import { PUBLIC_PB_URL } from '$env/static/public';

	export let showcaseArtist = '';
	export let showcaseData = {};
	let work = {};
	onMount(async () => {
		work = await (await fetch('/api/getRandomWork')).json();
		showcaseArtist = work.expand?.artists[0].name;
		showcaseData = work;
	});
</script>

{#await work}
	<p>Loading...</p>
{:then work}
	<div>
		<a href="/artists/{work.expand?.artists[0].name}/{work.title}">
			<p>{work.title} by {work.expand?.artists[0].name}</p>
			{#if work.pictures}
				<img
					src="{PUBLIC_PB_URL}api/files/pictures/{work.pictures?.id}/{work.pictures?.content}"
					alt=""
				/>
			{/if}
		</a>
	</div>
{/await}

<style>
	a {
		text-decoration: none;
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;

		text-align: center;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		align-items: center;
		justify-content: center;
	}
	p {
		width: fit-content;
		margin: 0;
		padding: 0;
		font-size: 0.8rem;
		text-align: center;
		color: var(--text-light);
		position: absolute;
		top: 0;
		left: 0;
	}
	p:hover {
		text-decoration: underline;
		color: wheat
	}
</style>
