<script>

	export let file;
	let image = () => {
		file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			const preview = document.getElementById('image-preview');
			preview.src = reader.result;
		};
		reader.readAsDataURL(file);
	};
	let content = '';
	let headlineContent = '';
	let template;
</script>

<form action="addNewWork" method="POST" enctype="multipart/form-data" class="formContainer">
	<h2>Add New Work</h2>
	<div class="formItem">
		<label for="image">Image</label>
		<div class="image-wrapper">
			{#if !file}
				<svg id="image-preview" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15">
					<path d="M20 0H0v15h20V0zM10 5H0v5h10V5zm5 6H5V10h10v6zm0 3H5v3h10v-3z" />
				</svg>
			{:else}
				<img id="image-preview" alt="Preview" />
			{/if}
			<input type="file" id="image" name="image" accept="image/*" on:change={() => image()} />
		</div>
	</div>
	<div class="formItem">
		<label for="credits">Credits</label>
		<input type="text" id="credits" name="credits" />
	</div>
	<div class="formItem">
		<label for="altText">Alt Text</label>
		<input type="text" id="altText" name="altText" />
	</div>
</form>

<style>
	:global(.tiptap) {
		width: 100%;
		height: 100%;
	}
	.template {
		display: block;
		width: 250px;
		padding: 1rem;

		font-size: 1rem;
		border: 2px solid #ccc;
		border-radius: 4px;
	}
	.formContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.formItem {
		margin-bottom: 1rem;
		display: felx;
		flex-direction: column;

		& label {
			margin-bottom: 0.5rem;
			font-weight: bold;
			color: var(--text-light);
		}
	}

	.image-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.image-wrapper img {
		max-width: 100%;
		max-height: 200px;
		margin-top: 1rem;
	}
	.editorWrapper {
		border: 2px solid #ccc;

		padding: 1rem;

		width: 250px;
	}
	.description {
		min-height: 90px;
		max-width: 100%;
		height: 100%;

		max-height: 250px;
		overflow-y: auto;
	}
</style>

