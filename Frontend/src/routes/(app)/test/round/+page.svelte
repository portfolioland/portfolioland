<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import Moveable from 'svelte-moveable';

	const draggable = true;
	const throttleDrag = 1;
	const edgeDraggable = false;
	const startDragRotate = 0;
	const throttleDragRotate = 0;
	const scalable = true;
	const keepRatio = false;
	const throttleScale = 0;
	const renderDirections = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];
	const rotatable = true;
	const throttleRotate = 0;
	const rotationPosition = 'top';
	let moveableRef;
	console.log(moveableRef, 'moveableRef');
	let targeter = true;
	$: classset = targeter
</script>
<input type="checkbox" bind:checked={targeter}>
<div class="root">
	<div class="container">
		{#each data.locator as item}
			<img
				src="http://127.0.0.1:8090/api/files/pictures/{item.id}/{item.content}"
				alt=""
				class={classset ? 'target' : 'target2'}
				style="width:200px; height:200px;"
			/>
		{/each}
		<Moveable
			
			target={'.target'}
			individualGroupable={true}
			{draggable}
			{throttleDrag}
			{edgeDraggable}
			{startDragRotate}
			{throttleDragRotate}
			{scalable}
			{keepRatio}
			{throttleScale}
			{renderDirections}
			{rotatable}
			{throttleRotate}
			{rotationPosition}
			on:drag={({ detail: e }) => {
				e.target.style.transform = e.transform;
				console.log(e);
			}}
			on:scale={({ detail: e }) => {
				e.target.style.transform = e.drag.transform;
			}}
			on:rotate={({ detail: e }) => {
				e.target.style.transform = e.drag.transform;
			}}
		/>
	</div>
</div>
