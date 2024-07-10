<script>
	export let image;
</script>

<div style="input">
	<div style="width: 100%;height:100%; display:flex; flex-direction:column">
		<img bind:this={image} src="" alt="Preview" style="width: 100%; height: 100%" />
		<div class="input">
			<label for="altText-{id}">Alt-Text:</label>
			<input type="text" name="altTxt-{id}" bind:value={altTxt} />
			<label for="credits-{id}">Credits:</label>
			<input type="text" name="credits-{id}" bind:value={credits} />
		</div>
	</div>
</div>


<style>
    .input{
        width: 60%;
    }

</style>