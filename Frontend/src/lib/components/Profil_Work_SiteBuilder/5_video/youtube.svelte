<script>
	import { onMount } from 'svelte';

	export let player;
	export let initialVideoId = '';

	const ytPlayerId = 'youtube-player';
	function onPlayerStateChange(event) {
		if (event.data === YT.PlayerState.ENDED) {
			player.seekTo(0); // Rewind to the beginning when video ends
			player.playVideo(); // Play the video again
		}
	}
	onMount(() => {
		function load() {
			player = new YT.Player(ytPlayerId, {
				height: '100%',
				width: '100%',
				videoId: initialVideoId,
				playerVars: {
					autoplay: 1, // Auto-play the video
					controls: 1, // Show player controls
					loop: 1, // Loop the video
					rel: 0, // Don't show related videos at the end
					showinfo: 0, // Hide video information
					mute: 1,
					iv_load_policy: '3',
				},
				events: {
					onStateChange: onPlayerStateChange
				}
			});
		}

		if (window.YT) {
			load();
		} else {
			window.onYouTubeIframeAPIReady = load;
		}
	});
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<div id={ytPlayerId} />

<style>
	div {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}
</style>
