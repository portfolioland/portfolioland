<script>
	let id = 'NXxeph83_xs';
	let autoplay = false;
</script>

{#if autoplay}
	<iframe
		width="98%"
		height="98%"
		src="https://www.youtube.com/embed/{id}?controls=0&autoplay=1&loop=1&mute=1&playlist={id}"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	></iframe>
{:else}
	<iframe
		width="98%"
		height="98%"
		src="https://www.youtube.com/embed/{id}?controls=0&autoplay=0&loop=1&mute=1&playlist={id}"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	></iframe>
{/if}
