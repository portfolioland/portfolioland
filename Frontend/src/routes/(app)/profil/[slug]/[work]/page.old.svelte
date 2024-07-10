<script>
	import LocatorUpdater from '$lib/components/Profil_Work_SiteBuilder/1_Locator/LocatorSvelte-grid-extended/locatorUpdaterSevelte-grid-extended.svelte';

	export let data;
	export let form
</script>

{#if data.user}
	<div class="layoutProfil">
		<LocatorUpdater {data} {form} />
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</div>
{/if}

<style>
	.layoutProfil {
		height: 95vh;
		height: 100%;
	}
</style>
