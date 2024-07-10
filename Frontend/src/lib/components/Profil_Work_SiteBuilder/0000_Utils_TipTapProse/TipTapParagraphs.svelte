<script>
	/**
	 * @typedef {import('svelte').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
	 * @typedef {import('@tiptap/core').Editor} Editor
	 * @typedef {import('@tiptap/starter-kit').StarterKitOptions} StarterKitOptions
	 * @typedef {import('@tiptap/extension-bubble-menu').BubbleMenuOptions} BubbleMenuOptions
	 */

	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Paragraph from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';

	/** @type {string} */
	export let type = 'headlines';
	let element;
	let editor;
	/** @type {string} */
	export let content = '<h1>Write something...</h1>';
	/** @type {function(string): void} */
	export let updateContent;
	export let editable = true;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3, 4]
					},
					paragraph: {
						
						HTMLAttributes: {
							contenteditable: 'true',
							'aria-multiline': 'true'
							
						}
					}
				}),
				BubbleMenu.configure({
					element: document.querySelector('.menu')
				})
			],

			content: content,
			onUpdate: ({ editor }) => {
				content = editor.getText();
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				content = editor.getText();
				updateContent(content);
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<!-- {#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if} -->

<div class="editor" bind:this={element} class:headlines={editable} />

<style>
	div {
		width: 100%;
		height: 100%;
	}
	.editor {
		
		color: var(--text-light-100, #0c0c205e);
		& :focus {
			outline: var(--focus-outline);
		}
	}

	.paragraph {
		font-size: 1rem;
		font-weight: bold;
		color: var(--text-light-100, #0c0c205e);
	}
	:global(.tiptap) {
		width: 100%;
		height: 100%;
		background-color: var(--white);
		
		&:focus {
			outline: 0.1rem solid var(--tertiary, #32b3b3);
		}
	}
</style>
