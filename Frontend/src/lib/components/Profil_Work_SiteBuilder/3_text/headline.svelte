<script>
	/**
	 * Component for a headline element that can be edited.
	 *
	 * @props
	 * - content: the content of the headline element (default: 'Write something')
	 * - updateContent: a function to update the content (default: undefined)
	 * - contenteditable: whether the headline is editable (default: true)
	 */
	import { init, handleInput } from '../utils';

	export let content = 'Write something'.trim();
	export let headlineID = '';
	export let workID = '';
	export let newEntries = false;


	/**
	 * Whether the headline is editable.
	 *
	 * @type {boolean}
	 * @default true
	 */
	export let contenteditable = true;

	/**
	 * A function to handle the input event.
	 *
	 * @param {Event} event - the input event
	 */

</script>

{#if contenteditable}
	<h2
		contenteditable="true"
		bind:textContent={content}
	
		use:init
		class="edit"
	></h2>
{:else}
	<h2 class="view">
		{@html content}
	</h2>
{/if}


{#if newEntries}
<input type="hidden" name="Item-new-{workID}" value={true} />
{/if}
<style>
	h2 {
		display: flex;
		justify-content: center;
		align-items: center;
		outline: none;
		width: 100%;
		height: 100%;
		min-width: 0;
		overflow-wrap: break-word;
		white-space: pre-wrap;
		font-size: 2.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* //responsive Fontsize */
	}
	.edit[contenteditable] {
		white-space: pre-wrap; /* or another appropriate value */
	}
	.view {
		outline: none;
		/* //responsive Fontsize */
	}
</style>
