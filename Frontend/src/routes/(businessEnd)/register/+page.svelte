<script>
	import { enhance } from '$app/forms';
	import LoginButton from '$lib/components/Buttons/loginButton.svelte';
	import Toggle from '$lib/components/Buttons/toggle.svelte';

	function showPassword() {
		const passwordInputs = document.querySelectorAll('input[id="password"]');
		passwordInputs.forEach((input) => {
			if (input.type === 'password') {
				input.type = 'text';
			} else {
				input.type = 'password';
			}
		});
	}
	export let data;
	export let form;
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Register for Portfolioland" />
	<meta name="robots" content="noindex, nofollow" />
	<meta name="googlebot" content="noindex, nofollow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

</svelte:head>
<main>
	<form action="?/register" method="POST" use:enhance>
		<h1 style="align-self: center;">Register for Portfolioland</h1>
		<fieldset>
			<legend>User Info</legend>
			<div class="inputwrapper">
				<label for="username">Name*</label>
				<input
					type="text"
					name="username"
					required
					value={form?.data.username === undefined ? '' : form?.data.username}
				/>
			</div>

			<div class="inputwrapper">
				<label for="email">Email*</label>
				<input
					type="email"
					name="email"
					required
					value={form?.data.email === undefined ? '' : form?.data.email}
				/>
			</div>
		</fieldset>
		<fieldset>
			<div class="inputwrapper">
				<!-- <legend>Password*</legend> -->
				<label for="password">Password*</label>
				<input
					type="password"
					name="password"
					id="password"
					class="password"
					required
					value={form?.data.password === undefined ? '' : form?.data.password}
				/>
			</div>
			<div class="inputwrapper">
				<label for="passwordConfirm">Password Confirm*</label>
				<input type="password" name="passwordConfirm" id="password" class="password" required />
			</div>

			<div style="align-self: flex-end">
				<Toggle
					id="showPassword"
					label="Show Password"
					hideLabel={false}
					name="showPassword"
					on:click={showPassword}
					switchColor="tomato"
					togglePrivate="#4bffdf"
				></Toggle>
			</div>
		</fieldset>
		<fieldset>
			<legend>Additional Info</legend>
			<!-- <label for="name">Name</label>
			<input type="text" name="name" value={form?.data.name === undefined ? '' : form?.data.name} /> -->

			<div class="inputwrapper">
				<label for="pronomen">Pronomen</label>
				<input
					type="text"
					name="pronomen"
					value={form?.data.pronomen === undefined ? '' : form?.data.pronomen}
				/>
			</div>
			<div class="inputwrapper">
				<label for="website">Website</label>
				<input
					type="text"
					name="website"
					value={form?.data.website === undefined ? '' : form?.data.website}
				/>
			</div>
			<!-- <label for="insta">Insta</label>
			<input
				type="text"
				name="insta"
				value={form?.data.insta === undefined ? '' : form?.data.insta}
			/> -->
			<!-- <div>
				<input
					type="checkbox"
					name="terms"
					value={form?.data.terms === undefined ? true : form?.data.terms}
				/>
				<label for="terms">Terms</label>
			</div> -->
		</fieldset>

		<fieldset>
			<legend>Register</legend>
			<div class="inputwrapper">
				<label for="registerPassword">Code</label>
				<input type="password" name="registerPassword" />
			</div>
		</fieldset>
		<div style="align-self: flex-end; margin-top: 0.5rem">
			<LoginButton>Register</LoginButton>
		</div>
	</form>
	{#if form?.error}
		<p class="error">{form?.error}</p>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		width: 100%;
		max-width: 400px;
		margin: 1rem auto;
		margin-top: -5rem;
		color: #0c0c20;

	}
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		border: 0.1rem solid #0c0c20;
		border-radius: 0.5rem;
		box-shadow: 2px 2px 4px #0c0c2052;
	}

	.inputwrapper {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		width: 100%;
		justify-content: center;
		align-items: center;
		& input {
			width: 100%;
		}
	}
	.error {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 10px;
		margin: 0.5%;
		padding: 10px 15px;
		width: max-content;
		border: 1px solid #000000;
		border-radius: 200px;
		color: #000000;
		margin-top: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		margin-top: 5rem;
		background-color: rgba(219, 69, 69, 0.821);
		color: #ffffff;
		transition: 2s all;
		opacity: 0.5;
		transition: opacity 10s;
		box-shadow: 2px 2px 4px #00000041;
	}
	.error {
		-webkit-animation: 4s 0s normal forwards 1 fadeout;
		animation: 4s 0s normal forwards 1 fadeout;
	}
	@keyframes fadeout {
		0% {
			opacity: 1;
		}
		66% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	@-webkit-keyframes fadeout {
		0% {
			opacity: 1;
		}
		66% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
	input {
		margin: 0.5rem;
		padding: 8px 10px;
		background: #ffffff;
		border: 0.1rem solid #000000;
		border-radius: 200px;
		color: #000000;
	}
	input:focus,
	input:hover {
		opacity: 1;
		transition: 0.4s;
		box-shadow: 2px 2px 4px #00000041;
		outline: solid 2px var(--tertiary, #4bffdf);
	}
</style>
