<script>
	import LoginButton from '$lib/components/Buttons/loginButton.svelte';
	import LogoutButton from '$lib/components/Buttons/logoutButton.svelte';
	import '$lib/app.css';
	import { page } from '$app/stores';
	/** @type {import('./$types').LayoutData} */
	export let data;
	import { fly } from 'svelte/transition';
	import RegisterButton from '$lib/components/Buttons/registerButton.svelte';
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<svelte:head>
	{#if data.url === '/'}
		<title>Portfolioland {data.url.replace('/', '')}</title>
	{:else}
		<title>Portfolioland - {data.url.replace('/', '')}</title>
	{/if}
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href="/favicon.svg" />

	<meta
		name="description"
		content="Welcome to my portfolioland, a plattform for art and design. From the Kunsthochschule Kassel"
	/>
	<meta property="og:title" content="Portfolioland - {data.url.replace('/', '')}" />
	<meta
		property="og:description"
		content="Welcome to my portfolioland, a plattform for art and design. From the Kunsthochschule Kassel"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${$page.baseUrl}${$page.url.pathname}`} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Portfolioland - {data.url.replace('/', '')}" />
	<meta
		name="twitter:description"
		content="Welcome to my portfolioland, a plattform for art and design. From the Kunsthochschule Kassel."
	/>

	<!-- Add additional meta tags, links, etc. here as needed -->
</svelte:head>

{#key data.url}
	<div in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
		<slot />
	</div>
{/key}

{#if $page.route.id != '/(app)/profil/[slug]'}
	<div class="headerWrapper">
		<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
		{#if $page.route.id != '/login' && !data.user}
			<div class="button login">
				<RegisterButton link={true} href="/register">Register</RegisterButton>
				<LoginButton link={true} />
			</div>
		{:else if data.user && $page.route.id != '/login'}
			<div class="button">
				<!-- <a class="button1" href="/profil/{data.user.name}">{data.user.name} User PROFIL</a>
				<a class="button1" href="/profil/{data.user.name}/">TestProfil PROFIL WorkSeite</a>
				<a class="button1" href="/artists/{data.user.name}/Elko%20Test">öffentliche Work</a>
				<a class="button1" href="/artists/TestProfil">TestProfil öffentliches Profil</a> -->
				<LogoutButton />
			</div>
		{:else}
			<div></div>
		{/if}
	</div>
{/if}



<style>
	:global(html) {
		width: 100dvw;
		color: var(--text-light);
		background: var(--bg-bright);
	}

	.headerWrapper {
		display: none;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		justify-content: end;
		//height: 3rem;

		padding: 0.5rem;

		position: fixed;
		bottom: 0;
		/* opacity: 0;
		height: 0.1px; */
		/* transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms; */
	}

	/* .headerWrapper:hover {
		opacity: 1;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 500ms;
		height: 2rem;
	} */
	.button {
		height: 2rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
		margin-right: 3%;
		margin-top: 0.5%;
	}
	.button1 {
		height: 2rem;
		display: flex;
		flex-direction: row;
		gap: 0.375rem;
		margin-right: 3%;
		margin-top: 0.5%;
		opacity: 0.1;
	}

	.button1:hover {
		opacity: 1;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 500ms;
		height: 2rem;
	}

	.login {
		opacity: 1;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 999;
	}


</style>
