<script>
	import { enhance } from '$app/forms';
	import { crossfade, fade, fly } from 'svelte/transition';
	import ToggleSwitch from '../Buttons/toggleSwitch.svelte';
	import Toggle from '../Buttons/toggle.svelte';
	/* 

*/
	let toggle = false;
	export let userData;
	export let formData;
	export let edit = true;

	let closed = false;
	let fromUpdater = 0;
	console.log(edit, 'edit from profilupdater');

	// * Variable die entweder vorhandene Userdaten oder Formulardaten nach dem absenden darstellt oder einen Platzhalter
	let nameFrom = userData.name ?? '';
	let name = formData?.name ? formData?.name : nameFrom;

	let pronomenForm = userData.pronomen ?? '';
	let pronomen = formData?.pronomen ?? pronomenForm;

	let klasseForm = userData.klasse && userData.klasse.length > 0 ? userData.klasse : '';
	let klasse = formData?.klasse ?? klasseForm;

	let websiteForm = userData.website ?? '';
	let website = formData?.website ?? websiteForm;

	let instaForm = userData.insta ?? '';
	let insta = formData?.insta ?? instaForm;

	// * Make the Input resopnsive in size with bind:value and x.length
	// * TernaryOperator for length of default size -> if no value is present

	$: nameLength = name.length ? name.length : 10;
	$: pronomenLength = pronomen.length ? pronomen.length : 6;
	$: klasseLength = klasse.length ? klasse.length : 6;
	$: websiteLength = website.length ? website.length : 10;
	$: instaLength = insta.length ? insta.length : 8;

</script>

<div class="toggle">
	<!-- * ToggleSwitch -->

	<!-- * From here the disabled part off the From -->

	{#if userData.terms}
		<div class="toggleSwitch">
			<Toggle
				label="Bearbeiten"
				hideLabel={false}
				bind:checked={edit}
				on:click={() => {
					edit = !edit;
				}}
			/>
		</div>
	{/if}

	<form
		data-sveltekit-keepfocus
		method="POST"
		action="?/updateUser"
		enctype="multipart/form-data"
		use:enhance
	>
		<div class="input">
			<label for="username">Username:</label>
			<input
				type="text"
				id="username"
				name="username"
				placeholder={name}
				pattern="^[ws.-]*$"
				bind:value={name}
				maxlength="30"
				size={nameLength}
				disabled={!edit}
			/>
		</div>

		<div class="input">
			<label for="pronomen">Pronomen:</label>
			<input
				type="text"
				id="pronomen"
				name="pronomen"
				placeholder={pronomen ? pronomen : 'Pronomen'}
				pattern="^.+?\/.+$"
				bind:value={pronomen}
				maxlength="20"
				size={pronomenLength}
				disabled={!edit}
			/>
		</div>

		<div class="input">
			<label for="Klasse">Klasse:</label>
			<input
				type="text"
				id="klasse"
				name="klasse"
				placeholder={klasse && klasse.length > 0 ? klasse : 'Klasse'}
				pattern="^[ws.-]*$"
				bind:value={klasse}
				maxlength="30"
				size={klasseLength}
				disabled={!edit}
			/>
		</div>

		<div class="input">
			<label for="Website">Website:</label>
			<input
				type="text"
				id="website"
				name="website"
				placeholder={website ? website : 'Website'}
				pattern="^https?:\/\/[^\s/$.?#].[^\s]*$"
				bind:value={website}
				size={websiteLength}
				disabled={!edit}
			/>
		</div>
		<div class="input">
			<label for="insta">Instagram:</label>
			<input
				type="text"
				id="insta"
				name="insta"
				placeholder={insta ? insta : 'Instagram'}
				pattern="^[ws.-]*$"
				bind:value={insta}
				size={instaLength}
				disabled={!edit}
			/>
		</div>
		{#if edit}
			<div transition:fade={{ duration: 400, delay: 250 }} class="transition">
				<input type="submit" aria-label="Save" name="form" id="form" value="Save" class="update" />
			</div>
		{/if}
		<!-- <dialog open={formData?.success && !closed}>
			<article>
				<header>
					<a href="#close" aria-label="Close" class="close" on:click={() => (closed = true)}
						>Success
					</a>
				</header>
				<p>
					Your Username has been successfully updated to "{formData?.name}"!
				</p>
				 <pre>{JSON.stringify(formData, null, 2)}</pre> 
			</article>
		</dialog> -->
	</form>
</div>

<style>
	.update {
		background: var(--grey);
	}
	.update:hover {
		background: var(--tertiary);
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 1000ms;
	}
	.transition {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.toggleSwitch {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: end;
		gap: 0.5rem;
	}
	/* form {
		display: flex;

		gap: 0.375rem;
	} */
	form {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.input {
		display: flex;
		margin-top: 1%;
		padding: 0.3125rem 0.625rem;
		align-items: center;

		flex-shrink: 0;

		gap: 0.375rem;

		width: auto;
	}
	input {
		display: flex;
		border: 0;
		outline: 0;

		font-size: 1rem;

		border-radius: 12.5rem;
		border: 1px solid black;
		padding: 0.3125rem 0.625rem;
		min-width: 2rem;
	}
	input:focus {
		outline: solid 2px var(--tertiary, #4bffdf);
	}
</style>
