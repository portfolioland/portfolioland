<script>
	import DeleteV_2 from '$lib/components/Delete/delete_v_2.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let submitForm = () => {
		if (updateOrderForm) {
			updateOrderForm.submit();
		}
	};
	let updateOrderForm;
</script>

<h1 on:click={() => submitForm()}>{data.user.name}</h1>

<form action="?/test" method="POST"  bind:this={updateOrderForm}>
	<input type="text" bind:value={data.user.name} form="updateOrder"/>
	<input type="text" bind:value={data.user.name} form="updateOrder" style="background-color: red" />
	<input type="text" bind:value={data.user.name} style="background-color: red" />
	<input type="submit">
</form>


<form action="?/test" method="POST" bind:this={updateOrderForm}>
	<input type="text" name="input1" />
	<input type="text" name="input2" />
	<input type="text" name="input3" />
	<input type="submit" value="Submit" />
</form>

