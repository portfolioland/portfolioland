<script>
	import TagInput from './tags.svelte';

	export let tags = [];
	export let suggestions = ['Skulptur', 'New Media', 'Theorie'];
</script>

<i>Comma or Enter to separate tags : </i>

{tags} <TagInput list={suggestions} bind:value={tags} />

<ul>
	{#each tags as t}
		{t}
	{/each}
</ul>
