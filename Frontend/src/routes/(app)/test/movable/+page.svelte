<script>
	import Moveable from 'svelte-moveable';

	const draggable = true;
	const throttleDrag = 1;
	const edgeDraggable = false;
	const startDragRotate = 0;
	const throttleDragRotate = 0;
	const scalable = true;
	const keepRatio = false;
	const throttleScale = 0;
	const snappable = true;
	const snapDirections = { top: true, left: true, bottom: true, right: true };
	const snapThreshold = 5;
	const verticalGuidelines = [50, 150, 250, 450, 550];
	const horizontalGuidelines = [0, 100, 200, 400, 500];
	let targetRef = null;
	let moveableRef = null;
	
</script>



<!-- 
<div class="root">
	<div class="container" style="width: 500px;height: 500px;border: 1px solid #ccc;">
		<div class="target" bind:this={targetRef} style="width: 200px;height: 150px;"></div>
		<Moveable
			bind:this={moveableRef}
			target={targetRef}
			{draggable}
			{throttleDrag}
			{edgeDraggable}
			{startDragRotate}
			{throttleDragRotate}
			{scalable}
			{keepRatio}
			{throttleScale}
			{snappable}
			{snapDirections}
			{snapThreshold}
			{verticalGuidelines}
			{horizontalGuidelines}
			on:drag={({ detail: e }) => {
				e.target.style.transform = e.transform;
				console.log(e);
			}}
			on:scale={({ detail: e }) => {
				e.target.style.transform = e.drag.transform;
				console.log(e);
			}}
		/>
	</div>
</div> -->
