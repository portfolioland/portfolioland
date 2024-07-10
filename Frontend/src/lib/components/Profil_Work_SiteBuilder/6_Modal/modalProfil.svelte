<script>
	import ToggleSwitch from '$lib/components/Buttons/toggleSwitch.svelte';
	import TiptapParagraph from '../0000_Utils_TipTapProse/tiptapexample.svelte';
	import TipTapHeadline from '../0000_Utils_TipTapProse/TipTap.svelte';

	import Tags from '$lib/components/Tags/tags.svelte';
	import Toggle from '$lib/components/Buttons/toggle.svelte';

	let file;
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
	export let template;
	export let artist = '';
	export let title = '';
	let description = '';
	let jahr = 2024;
	let checked = false;
	let showPic = false;
	export let close;
	if (close) {
		showPic = !showPic;
		file = null;
	}

	export let tags = [];
	export let tag = [];
</script>

<form action="?/addNewWork" method="POST" enctype="multipart/form-data" class="formContainer">
	<h2>Add New Work</h2>
	<div class="formItem">
		<label for="title">Title*</label>
		<div class="editorWrapper">
			<TipTapHeadline bind:content={headlineContent} />
			<input type="hidden" id="title" name="title" bind:value={headlineContent} required />
		</div>
	</div>
	<div class="formItem">
		<label for="description">Description*</label>
		<div class="editorWrapper description" style="">
			<TiptapParagraph bind:content updateContent={content} />

			<input
				type="text"
				id="description"
				name="description"
				bind:value={content}
				style="display: none"
				
			/>
		</div>
	</div>

	<!-- <div class="template toggle border-none">
		<label for="template">Template</label>
		<select id="template" name="template" bind:value={template} style="">
			<option value="template1" selected>
				Template 1
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M12 2L1 21h19z" />
					<path d="M12 6L12 8" />
					<path d="M12 12L12 14" />
					<path d="M12 18L12 20" />
				</svg>
			</option>
			<option value="template2">
				Template 2
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M12 2L1 21h19z" />
					<path d="M12 4L6 14h3v7h6v-7h3l-4-5z" />
					<path d="M12 10L12 12" />
					<path d="M12 16L12 18" />
				</svg>
			</option>
			<option value="template3">
				Template 3
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M12 2L1 21h19z" />
					<path d="M12 4L12 6" />
					<path d="M12 10L6 16h3v7h6v-7h3l-4-5z" />
					<path d="M12 16L12 18" />
				</svg>
			</option>
		</select>
	</div> -->

	<div class="toggle border-none tags" style="margin-top: 2rem; flex-direction: row;">
		<Tags list={tags} bind:value={tag} />
		<input type="hidden" id="tags" name="tags" bind:value={tag} />
	</div>

	<div class="toggle" style="border: none;">
		<label for="jahr"
			>Entstehungsjahr: <input
				type="number"
				bind:value={jahr}
				max={2024}
				min={1970}
				placeholder="Entstehungsjahr"
				name="jahr"
				id="jahr"
				required
			/></label
		>

		<label for="artist">Artist</label>
		<input type="text" id="artist" name="artist" bind:value={artist} list="artists" />
	</div>

	<div class="toggle" id="public" style="margin-top: 2rem; ">
		<Toggle label="Public" bind:toggled={checked} hideLabel={false} dispatcherON={false} />
		<input type="hidden" id="public" name="public" bind:value={checked} />
		<button type="submit">Submit</button>
	</div>

	<div class="formItem"></div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
		color:#e31c3d8b;
		
	}
	.toggle {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
		width: 100%;
		justify-content: space-between;
		border-top: 1px solid #ccc;
		padding-top: 0.5rem;
	}
	.border-none {
		border: none;
	}
	label {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
	}
	:global(.tiptap) {
		width: 100%;
		height: 100%;
	}
	.template {
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

		padding: 0.1rem;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		min-width: 350px;
		height: 2rem;

		border-radius: 4px;
	}
	.description {
		min-height: 90px;
		max-width: 100%;
		height: 100cqh;

		max-height: 250px;
		overflow-y: auto;
	}

	.tags {
		flex-direction: column;
		width: 100%;
		justify-content: start;
		margin-left: 1rem;
	}
</style>
