<script>
	import LoginButton from '$lib/components/Buttons/loginButton.svelte';
	import { PUBLIC_TEST_ACCOUNT, PUBLIC_TEST_ACCOUNT_PW } from '$env/static/public';

	export let form;
	let email = PUBLIC_TEST_ACCOUNT;
	//TODO: Before release delete value
	let password = PUBLIC_TEST_ACCOUNT_PW;
	//TODO: Before release delete value
	let visible = false;
</script>

<div class="loginwrapper">
	<form method="POST" action="/login">
		<input
			id="email"
			name="email"
			type="text"
			placeholder="Enter your e-mail"
			value={form?.email ?? email}
		/>
		<!-- Value bleibt bestehen und wird  -->

		<!-- <label for="email">username</label> -->
		<input
			id="password"
			name="password"
			type="password"
			placeholder="Enter your password"
			bind:value={password}
		/>
		<!-- <label for="password">password</label> -->
		<LoginButton>Login</LoginButton>

		{#if form?.missing}<p class="error">Please enter USERNAME</p>{/if}

		{#if form?.incorrect}<p class="error">Please enter PASSWORD</p>{/if}

		{#if form?.invalid}<p class="error">Invalid PASSWORD</p>{/if}
	</form>
</div>

<style>
	.loginwrapper {
		width: 100dvw;
		width: 100vw;
		height: 100%;
		display: flex;
		justify-content: center;
		margin-top: 30vh;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 10px;
	}
	p {
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
	}
	.error {
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
		margin: 0.7rem;
		padding: 10px 15px;
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
