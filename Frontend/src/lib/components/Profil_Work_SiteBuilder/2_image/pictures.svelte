<script>
	import { PUBLIC_PB_URL } from '$env/static/public';

	let input;
	let image;
	let showImage = false;
	let test;
	export let id = '';
	export let collectionID = 'imagte5o4n6kp1p';
	/* todo: make the collection id dynamic */
	export let content = image;
	export let altTxt = '';
	export let credits;
	export let contenteditable = true;
	export let submit = () => {};

	function onChange() {
		const file = input.files[0];

		if (file) {
			if (file.size > 5242880) {
				alert(
					'Die Bildgröße sollte nicht großer als 5MB betragen. \n\nDas Bild wurde nicht gespeichert'
				);
				input.value = '';
				input.files[0] = null;
				return;
			}
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
			submit();
			return file;
		}

		showImage = false;
	}

	let altText = 'Beschreibung:';

	function inputClick(e) {
		e.click();
	}
</script>

{#if !content}
	<input
		class:none={showImage}
		bind:this={input}
		on:change={onChange}
		type="file"
		name="fileData-{id}"
		id="image"
		style="display: none;"
		use:inputClick
		maxlength="5242880
		"
	/>

	{#if showImage}
		<div style="width: 100%;height:100%; display:flex; flex-direction:column">
			<img
				id="img"
				bind:this={image}
				src=""
				alt="Preview"
				style="width: 100%; height: 100%"
				draggable="false"
			/>
			<div class="input">
				<label for="altText-{id}">Alt-Text:</label>
				<input type="text" name="altTxt-{id}" bind:value={altTxt} />
				<label for="credits-{id}">Credits:</label>
				<input type="text" name="credits-{id}" bind:value={credits} />
				<input type="hidden" name="Item-new-{id}" value={true} />
			</div>
		</div>
	{/if}
{:else}
	<div style="width: 100%;height:100%">
		<img
			id="img"
			src="{PUBLIC_PB_URL}api/files/{collectionID}/{id}/{content}"
			alt={altTxt}
			style="width:100% ; height:100%"
			draggable="false"
		/>

		<p class="credits">Credits: <span>{credits}</span></p>
	</div>
{/if}

<style>
	img {
		width: 100cqw;
		height: 100cqh;

		object-fit: cover;

		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.none {
		display: none;
		background-color: rgb(252 211 77);
	}
	.input {
		display: flex;
		flex-direction: row;
		gap: 0;
	}
	.credits {
		font-size: xx-small;
		display: flex;
		align-self: end;
		color: #9ca3af;
		position: relative;
		right: 0.5rem;
		bottom: 1rem;

		& span {
			font-weight: bold;
		}
	}
</style>
