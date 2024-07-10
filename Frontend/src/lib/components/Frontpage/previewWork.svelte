<script>
	import { PUBLIC_PB_URL } from '$env/static/public';
	import TagDisplay from '../Tags/tagDisplay.svelte';
	export let work = {};
</script>

<!-- <pre>{JSON.stringify(work, null, 2)}</pre> -->
<article>
	<section class="title">
		<a href="/artists/{work.expand?.artists[0].name}/{work.title}">{work.title}</a>
	</section>
	<section class="name">
		<a href="/artists/{work.expand?.artists[0].name}">{work.expand?.artists[0].name}</a>
	</section>
	<section class="jahr">{work.jahr}</section>
	<section class="image">
		{#if work.image}
			<a href="/artists/{work.expand?.artists[0].name}/{work.title}">
				<img
					src="{PUBLIC_PB_URL}api/files/pictures/{work.image?.id}/{work.image?.content} "
					alt=""
				/>
			</a>
		{:else}
			<a href="/artists/{work.expand?.artists[0].name}/{work.title}">
				<img src="https://via.placeholder.com/300x300?text=No+Image" alt="No pic" />
			</a>
		{/if}
	</section>
	<section class="tags">
		{#if work.expand?.tag}
			{#each work.expand?.tag as tag}
				<TagDisplay tag={tag.title} />
			{/each}
		{/if}
	</section>
</article>

<style>
	article {
		width: 90%;
		height: 90%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		border: solid 0.1rem var(--text-light);

		grid-column: span 2;
	}
	section {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	a {
		text-decoration: none;
		color: var(--text-light);
		&:hover {
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 1000ms;
		}
	}
	.title {
		font-size: 1.5rem;
	}
	.name {
	}

	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.25rem;
		border-top: solid 0.1rem var(--text-light);

		padding-top: 0.25rem;
	}
	.jahr {
		font-style: italic;
	}

	.image {
		overflow: hidden;
		display: flex;
		justify-content: center;

		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
