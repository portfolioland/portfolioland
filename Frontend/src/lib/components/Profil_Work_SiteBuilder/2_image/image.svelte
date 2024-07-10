<script>
	export let id = '';
	export let altTxt = '';
	export let credits = '';
	let input;
	let showImage = false;
	let image;
	let file;

	function onChange() {
		const file = input.files[0];

		if (file) {
			showImage = true;
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				console.log('File loaded successfully:', reader.result);

				let content = reader.result;
				// Add the loaded file content to the array under the key 'content'

				image.setAttribute('src', content);
			});

			reader.addEventListener('error', function (error) {
				console.error('Error reading the file:', error);
			});

			reader.readAsDataURL(file);
			return file;
		}

		showImage = false;
	}

	let altText = 'Beschreibung:';

	function inputClick(e) {
		e.click();
	}

</script>


	<input
		bind:this={input}
		on:change={onChange}
		type="file"
		name="fileData-{id}"
		id="image"
		use:inputClick
	/>
	
	{#if showImage}
		<img bind:this={image} src="" alt="Preview" />
	{/if}


<style>
	img {
		width: 100%;
		height: auto;
	}
</style>
