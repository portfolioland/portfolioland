<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Document from '@tiptap/extension-document';
	import Paragraph from '@tiptap/extension-paragraph';
	import HardBreak from '@tiptap/extension-hard-break';
	import Text from '@tiptap/extension-text';
	import Bold from '@tiptap/extension-bold';
	import Code from '@tiptap/extension-code';
	import Italic from '@tiptap/extension-italic';
	import Strike from '@tiptap/extension-strike';
	import Underline from '@tiptap/extension-underline';
	import Link from '@tiptap/extension-link';
	import Placeholder from '@tiptap/extension-placeholder';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import CharacterCount from '@tiptap/extension-character-count';
	import Youtube from '@tiptap/extension-youtube';

	export let content = '';
	let output;
	export let limit = NaN;

	export let bold = true;
	export let italic = true;
	export let strike = false;
	export let underline = false;
	export let link = true;
	export let code = false;
	export let placeholder = '';

	let element;
	let bmenu;
	let editor;
	export let updateContent;

	const CustomBold = Bold.extend({
		renderHTML({ HTMLAttributes }) {
			// Original:
			// return ['strong', HTMLAttributes, 0]
			return ['b', HTMLAttributes, 0];
		}
	});

	const setLink = () => {
		if (editor.isActive('link')) {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		if (!/^https?:\/\//.test(url)) {
			window.alert('Non valid url');
			return;
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	};

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Document,
				Paragraph,
				Text,
				//Bold,
				CustomBold,
				Code,
				Italic,
				Strike,
				Underline,
				Youtube,
				Link.configure({
					validate: (href) => /^https?:\/\//.test(href),
					HTMLAttributes: { rel: null, target: null }
				}),
				BubbleMenu.configure({
					element: bmenu,
					tippyOptions: { duration: 100, theme: 'local', maxWidth: 450, appendTo: document.body }
				}),
				// CharacterCount.configure({
				// 	limit
				// }),
				HardBreak.extend({
					addKeyboardShortcuts() {
						return {
							Enter: () => this.editor.commands.setHardBreak()
						};
					}
				}).configure({ keepMarks: false }),
				Placeholder.configure({ placeholder })
			],
			content,
			editorProps: {
				attributes: {
					class: 'border border-gray-300 rounded p-3 outline-none text-base'
				}
			},
			onCreate({ editor }) {
				// The editor is ready.
				const html = editor.getHTML();
				// send the content to an API here
				output = html;
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				content = editor.getHTML();
			},
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				// send the content to an API here
				output = html;
				content = editor.getHTML();
				updateContent = content;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={bmenu}>
	{#if editor}
		{#if bold}
			<button
				class="mx-1 px-1 text-sm text-gray-300 hover:text-white {editor.isActive('bold')
					? 'ring ring-gray-100 text-white rounded'
					: ''}"
				on:click|preventDefault={() => editor.chain().focus().toggleBold().run()}
			>
				Bold
			</button>
		{/if}

		{#if italic}
			<button
				class="mx-1 px-1 text-sm text-gray-300 hover:text-white {editor.isActive('italic')
					? 'ring ring-gray-100 text-white rounded'
					: ''}"
				on:click|preventDefault={() => editor.chain().focus().toggleItalic().run()}
			>
				Cursiv
			</button>
		{/if}

		{#if strike}
			<button
				class="mx-1 px-1 text-sm text-gray-300 hover:text-white {editor.isActive('strike')
					? 'ring ring-gray-100 text-white rounded'
					: ''}"
				on:click|preventDefault={() => editor.chain().focus().toggleStrike().run()}
			>
				strike
			</button>
		{/if}

		{#if underline}
			<button
				class="mx-1 px-1 text-sm text-gray-300 hover:text-white {editor.isActive('underline')
					? 'ring ring-gray-100 text-white rounded'
					: ''}"
				on:click|preventDefault={() => editor.chain().focus().toggleUnderline().run()}
			>
				underline
			</button>
		{/if}

		{#if code}
			<button
				class="mx-1 px-1 text-sm text-gray-300 hover:text-white {editor.isActive('code')
					? 'ring ring-gray-100 text-white rounded'
					: ''}"
				on:click|preventDefault={() => editor.chain().focus().toggleCode().run()}
			>
				Code
			</button>
		{/if}

		{#if link}
			<button
				class="mx-1 px-1 text-sm text-gray-300 hover:text-white {editor.isActive('link')
					? 'ring ring-gray-100 text-white rounded'
					: ''}"
				on:click|preventDefault={setLink}
			>
				Link
			</button>
		{/if}
	{/if}
</div>

<div class="editor" bind:this={element} />

<!-- {#if editor}
	<div class="text-sm text-gray-500">
		{editor.storage.characterCount.characters({ mode: 'textSize' })}/{limit} caracteres
	</div>
{/if} -->

<style>
	div {
		width: 100%;
		height: auto;
	}
	:global(.tiptap) {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
	:global(.tiptap:focus) {
		outline: 0.1rem solid var(--tertiary, #32b3b3);
	}
</style>
