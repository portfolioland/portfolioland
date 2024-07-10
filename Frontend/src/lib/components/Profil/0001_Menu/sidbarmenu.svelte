<script>
	import ProfilUpdater from '../3_profilUpdater.svelte';

	import ModalProfil from '$lib/components/Profil_Work_SiteBuilder/6_Modal/modalProfil.svelte';
	import Modal from '$lib/components/Profil/5_ModalParent.svelte';
	import { onMount, onDestroy } from 'svelte';
	import Delete from '$lib/components/Delete/delete_v_2.svelte';
	import { fade } from 'svelte/transition';
	import LogoutButton from '$lib/components/Buttons/logoutButton.svelte';
	import { enhance } from '$app/forms';

	import TogglePublicState from './TogglePublicState.svelte';
	import { flip } from 'svelte/animate';
	import Grid, { GridItem } from 'svelte-grid-extended';
	import DeleteV_2 from '$lib/components/Delete/delete_v_2.svelte';

	export let open = false;

	export let data;
	export let form;
	$: works = data.works;
	let user = data.user;
	let tags = data.tag.map((tag) => tag.title);
	let artist = data.user.name;
	let template = 'template1';

	export let addWork = false;
	export let toggle = false;
	export let editWork;

	$: editWork = toggle;
	let closeButton = false;

	const setWindowWide = () => {
		if (typeof window !== 'undefined') {
			open = window.innerWidth >= 1025;
			closeButton = window.innerWidth <= 1025;
			console.log(open, 'open');
		}
	};

	onMount(() => {
		setWindowWide();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', setWindowWide);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', setWindowWide);
		}
	});

	export let bearbeiten;
	$: bearbeitenReactiv = bearbeiten;

	$: items = works;

	const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
		for (let i = 0; i < e.detail.items.length; i++) {
			e.detail.items[i].order = i;
		}
	}
	function handleDndFinalize(e) {
		let updatedItems = JSON.parse(JSON.stringify(items)); // Make a deep copy of items
		console.log(updatedItems);
		updatedItems = e.detail.items;
		for (let i = 0; i < e.detail.items.length; i++) {
			updatedItems[i].order = i;
		}
		items = updatedItems;
		submitForm();
	}
	let updateOrderForm;

	let submitForm = () => {
		if (updateOrderForm) {
			updateOrderForm.requestSubmit();
		}
	};
</script>

<aside class:open>
	<div class:open>
		{#if closeButton}
			<div class="close">
				<button on:click={() => (open = !open)}>Close</button>
			</div>
		{/if}
		<h1>
			Welcome to your Portfolioland Profil,
			{#if !user.terms}
				{user.name}
				{#if user.pronomen != ''}
					{' ' + '(' + user.pronomen + ')' + '.'}{/if}
			{:else}
				{user.name}
				{#if user.pronomen != ''}
					{' ' + '(' + user.pronomen + ')' + '.'}{/if}
			{/if}
		</h1>

		<ProfilUpdater userData={data.user} formData={form} bind:edit={bearbeiten} />

		{#if bearbeitenReactiv}
			<div class="addWork" transition:fade={{ delay: 100, duration: 300 }}>
				<button on:click={() => (addWork = !addWork)}>Add New Work</button>
			</div>
		{/if}
	</div>
	<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
	<!-- Liste von Works zu Profil hinzufügen mit PublicState und Reihenfolge -->

	<!-- <pre>{JSON.stringify(items, null, 2)}</pre> -->

	<div class="listOfWorks">
		<h2>List of Works</h2>
		<form
			action="?/updateOrder"
			method="POST"
			name="updateOrder"
			id="updateOrder"
			use:enhance
			bind:this={updateOrderForm}
		>
			<section>
				<!-- <pre>{JSON.stringify(items, null, 2)}</pre> -->
				{#each items as item}
					<div class="publicInfo">
						<h3>
							<a href="/profil/{data.user.name}/{item.title}"> {item.title}</a>
						</h3>

						<div style="display: flex; gap: 0.5rem">
							{#if bearbeitenReactiv}
								<form action="?/deleteWork" method="POST" name="deleteWork" id="deleteWork">
									<DeleteV_2 workID={item.id} icon={false} />
									<!-- <input type="text" form="deleteWork" name="title" value={item.title} /> -->
								</form>
							{/if}
							{#if bearbeitenReactiv}
								<TogglePublicState work={item} publicState={item.public} />
							{:else}
								<TogglePublicState work={item} publicState={item.public} disabled />
							{/if}
						</div>
					</div>
					<!-- <input type="hidden" form="updateOrder" name="id" value={item.id} /> -->
					<!-- <input
							type="text"
							form="updateOrder"
							name="order"
							value={item.order}
						/> -->
				{/each}
			</section>
		</form>
	</div>

	<Modal showModal={addWork}>
		<ModalProfil bind:close={addWork} bind:tags bind:artist {template} />
	</Modal>

	<div class="logout">
		<LogoutButton />
	</div>
</aside>

<style>
	.logout {
		display: flex;
		justify-content: end;
		gap: 0.5rem;
		align-items: end;
	}
	.close {
		display: flex;
		align-items: end;
		justify-content: end;
		width: 100%;

		top: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease-in-out;

		font-size: larger;
		/* background-color: rgb(248 113 113); */

		color: var(--text-light);

		&:hover {
			/* background-color: rgb(248 113 113); */
			color: var(--tertiary);
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 1000ms;
		}
	}
	aside {
		position: sticky;
		background-color: var(--bg-light);
		position: absolute;
		width: 20%;
		height: 98%;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		left: -110%;
		transition: left 0.3s ease-in-out;
		z-index: 10;
		border-right: solid 0.1rem var(--text-light);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		grid-area: sidebar;
		overflow: auto;
		border-right: solid 0.1rem var(--text-light);
		border-bottom: solid 0.1rem var(--text-light);
		padding: 1rem 1rem 1rem 1rem;

		& h1 {
			padding-bottom: 1rem;
		}

		&.open {
			left: 0;

			& .addWork {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-top: 1rem;
				border: solid 1 px var(--text-light);

				padding: 5%;
			}
		}
	}
	.publicInfo {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;

		& a {
			text-decoration: none;
			color: var(--text-light);
			&:hover {
				color: var(--tertiary);
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				transition-duration: 1000ms;
			}
		}
		& h3 {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;

			&:hover {
				opacity: 100;
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				transition-duration: 1000ms;
			}
		}
	}
	.listOfWorks {
		display: flex;
		flex-direction: column;
		max-width: 700px;

		gap: 0.5rem;
		margin-bottom: 50px;
		& a {
			text-decoration: none;
			color: var(--text-light);
			&:hover {
				color: var(--tertiary);
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				transition-duration: 1000ms;
			}
		}
	}
	.button {
		background-color: transparent;
		border: none;
		display: flex;
		justify-content: center;
		align-self: center;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
	}

	@media (max-width: 1025px) {
		aside {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-self: center;
			width: 90cqw;
		}
	}
</style>
