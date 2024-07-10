
<script>
	
	// pos is cursor position when right click occur
	export let pos = { x: 0, y: 0 };
	// menu is dimension (height and width) of context menu
	let menu = { h: 0, y: 0 };
	// browser/window dimension (height and width)
	let browser = { h: 0, y: 0 };
	// showMenu is state of context-menu visibility
	let showMenu = false;
	// to display some text
	let content;

	function rightClickContextMenu(e) {
		showMenu = true;
		browser = {
			w: window.innerWidth,
			h: window.innerHeight
		};
		pos = {
			x: e.clientX,
			y: e.clientY
		};

		if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
		if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
	}
	function onPageClick(e) {

		showMenu = false;
	}
	function getContextMenuDimension(node) {
		let height = node.offsetHeight;
		let width = node.offsetWidth;
		menu = {
			h: height,
			w: width
		};
	}

	export let addItem;
	export let addP;
	export let headline;

	function print() {
		content.textContent = 'Printed...';
	}
	function zoom() {
		content.textContent = 'Zooom...';
	}
	function remove() {
		content.textContent = 'Removed...';
	}
	function setting() {
		content.textContent = 'Settings...';
	}
	function save() {
		document?.getElementById('locatorForm')?.submit();
	}

	let menuItems = [
		{
			name: 'add Picture',
			onClick: addItem,
			displayText: 'Add Picture',
			class: 'fa-solid fa-plus'
		},

		{
			name: 'add Headline',
			onClick: headline,
			displayText: 'Add Headline',
			class: 'fa-solid fa-plus'
		},
		{
			name: 'add Paragraph',
			onClick: addP,
			displayText: 'Add Paragraph',
			class: 'fa-solid fa-plus'
		},
		
		{
			name: 'hr'
		},

		{
			name: 'hr'
		},
		{
			name: 'save',
			onClick: save,
			displayText: 'Save',
			class: 'fa-solid fa-trash-can'
		}
	];
</script>
<div class="content" bind:this={content}>Right click somewhere!</div>

{#if showMenu}
	<nav use:getContextMenuDimension style="position: absolute; top:{pos.y}px; left:{pos.x}px">
		<pre>x:{pos.x} y:{pos.y}</pre>
		<div class="navbar" id="navbar">
			<ul>
				{#each menuItems as item}
					{#if item.name === 'hr'}
						<hr />
					<!-- {:else if item.name === 'save'}
						<input type="submit" name="form" id="formContext" form="locatorForm" value="Save" /> -->
					{:else}
						<li>
							<button on:click={item.onClick}><i class={item.class}><img src={headline} alt=""></i>{item.displayText}</button>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</nav>
{/if}

<svelte:window on:contextmenu|preventDefault={rightClickContextMenu} on:click={onPageClick} />

<style>
	* {
		padding: 0;
		margin: 0;
		z-index: 99;
	}

	.navbar {
		display: inline-flex;
		border: 1px #999 solid;
		width: 170px;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		flex-direction: column;
	}
	.navbar ul {
		margin: 6px;
	}
	ul li {
		display: block;
		list-style-type: none;
		width: 1fr;
	}
	ul li button {
		font-size: 1rem;
		color: #222;
		width: 100%;
		height: 30px;
		text-align: left;
		border: 0px;
		background-color: #fff;
	}
	ul li button:hover {
		color: #000;
		text-align: left;
		border-radius: 5px;
		background-color: #eee;
	}
	ul li button i {
		padding: 0px 15px 0px 10px;
	}
	ul li button i.fa-square {
		color: #fff;
	}
	ul li button:hover > i.fa-square {
		color: #eee;
	}
	ul li button:hover > i.warning {
		color: crimson;
	}
	:global(ul li button.info:hover) {
		color: navy;
	}
	hr {
		border: none;
		border-bottom: 1px solid #ccc;
		margin: 5px 0px;
	}
</style>
