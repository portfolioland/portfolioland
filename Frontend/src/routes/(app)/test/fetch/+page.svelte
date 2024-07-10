<script>
	import ImgDisplay from '$lib/components/Frontpage/imgDisplay.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	export let error;
</script>
<div class="container">

	<ImgDisplay />
</div>



<style>
	.container {
		width: 100px;
		height: 100px;

	}
</style>