<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let data;

	let previewUrl = browser ? sessionStorage.getItem('previewUrl') : null;

	function sessionStore(field, value) {
		if (browser) window.sessionStorage.setItem(field, value);
	}

	async function savePreview(event) {
		const imageFile = event.target.files[0];
		if (!imageFile) return;
		const imgURL = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(imageFile);
		});

		previewUrl = imgURL;

		
	}
</script>

<label for="file">Choose image:</label>
<input id="file" type="file" accept="image/*" on:change={savePreview} />

{#if previewUrl}
	<img src={previewUrl} alt="Preview" />
{/if}

<style>
	img {
		width: 200px;
		height: 200px;
	}
</style>
