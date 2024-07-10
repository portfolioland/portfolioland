<script>
	import LocatorViewer from '$lib/components/Profil_Work_SiteBuilder/1_Locator/locatorViewer.svelte';
	import TagDisplay from '$lib/components/Tags/tagDisplay.svelte';
	import LocatorUpdater from '$lib/components/Profil_Work_SiteBuilder/1_Locator/LocatorSvelte-grid-extended/locatorUpdaterSevelte-grid-extended.svelte';
	//import LocatorUpdater from '$lib/components/Profil_Work_SiteBuilder/1_Locator/locatorUpdater.save.svelte';
	import Sidebar from '$lib/components/Profil/0001_Menu/sidbarmenu.svelte';
	import TipTap from '$lib/components/Profil_Work_SiteBuilder/0000_Utils_TipTapProse/TipTap.svelte';
	export let data;
	export let form;
	console.log(form, 'FORM');
	// console.log(data, 'DATA');

	let addWork = false;
	let toggle = false;
	let editWork;
	$: editWork = toggle;
	let menubutton = true;

	import { onMount, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';
	import TogglePublicState from '$lib/components/Profil/0001_Menu/TogglePublicState.svelte';
	import Tags from '$lib/components/Tags/tags.svelte';

	const setWindowWide = () => {
		if (typeof window !== 'undefined') {
			editWork = window.innerWidth > 1024;
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
	let bearbeiten = true;
	$: bearbeitenReactiv = bearbeiten;
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<div class="appWrap">

		{#each data.locator as locator, index}
			<!-- <pre>{JSON.stringify(locator, null, 2)}</pre> -->
			<div class="locatorWrapper">
				<LocatorUpdater data={locator} {form} toggle={bearbeitenReactiv} />
			</div>
		{/each}

</div>

<style>
	.locatorWrapper {
	}
	.appWrap {
		display: grid;
		grid-template-areas: 'sidebar content';
		grid-template-columns: 0.99fr 3.5fr;
		width: 100vw;
		overflow: hidden;
	}

	.workDisplay {
		grid-area: content;
		height: 100%;
		overflow: scroll;
	}

	.workFooter * {
		width: 99%;
	}

	.workFooter {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 0.1rem var(--text-light);
		padding-left: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		background: var(--bg-light);
		& .tags {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			justify-content: flex-start;
			gap: 0.25rem;
			margin-top: 0.5rem;
			justify-content: flex-end;
		}
		& .togglePublicState {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
		}
	}

	@media (max-width: 1025px) {
		.appWrap {
			grid-template-areas: 'content';
			grid-template-columns: 1fr;
		}

		.workDisplay {
			grid-area: content;
			overflow: scroll;
		}
	}
</style>
