<form style="opacity: 1;" action="/logout" method="POST">
	<button type="submit" class="logoutButton" title="logout button"
		>Logout <div class="circle" title="circleElement"></div>
	</button>
</form>

<style>
	button {
		display: flex;
		width: 5.1875rem;

		align-items: center;
		gap: 0.125rem;
		border-radius: 12.5rem;
		border: 1px solid var(--text-light, #0c0c20);
		background-color: var(--bg-bright, rgb(241, 240, 240));

	}
	button:hover {
		border-radius: 12.5rem;
		border: 1px solid var(--color-error, #e31c3d);
		background: rgba(227, 28, 61, 0.4);
		color: var(--color-error);

		& .circle {
			border-color: var(--color-error);
		}
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 1000ms;
	}
	button:focus {
		border-radius: 12.5rem;
		outline: 3px solid var(--tertiary);
		
		/* box-shadow: 0px 4px 4px 0px rgba(12, 12, 32, 0.25); */
	}

	.circle {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
		border-radius: 12.5rem;
		border: 1px solid var(--text-light);
		background: var(--color-error, #e31c3d);
	}
</style>
