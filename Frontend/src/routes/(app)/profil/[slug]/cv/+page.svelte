<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

Hier entsteht ein CV-Generator. Der CV-Generator speißt sich aus den Daten, die die Profile in ihre
in work einpflegen.

<h2>CV {data.user.name} *XX</h2>
<h2>Ausbildung</h2>
<form action="">
	<table>
		<tr>
			<th>Jahr</th>
			<th>Ausbildungstitel</th>
			<th>Ort</th>
		</tr>
		<tr>
			<th><input type="text" /></th>
			<th><input type="text" /></th>
			<th><input type="text" /></th>
		</tr>
	</table>
</form>
<h2>Ausstellungen</h2>
<table>
	<tr>
		<th>Jahr</th>
		<th>Ausstellung</th>
		<th>Ort</th>
	</tr>
	<tr>
		<th><input type="text" /></th>
		<th><input type="text" /></th>
		<th><input type="text" /></th>
	</tr>
</table>

<h2>Preise</h2>
<table>
	<tr>
		<th>Preise</th>
		<th>Ausstellung</th>
		<th>Ort</th>
	</tr>
	<tr>
		<th><input type="text" /></th>
		<th><input type="text" /></th>
		<th><input type="text" /></th>
	</tr>
</table>

<h2>Veröffentlichung</h2>
<table>
	<tr>
		<th>Veröffentlichung</th>
		<th> </th>
		<th>Ort</th>
	</tr>
	<tr>
		<th><input type="text" /></th>
		<th></th>
		<th><input type="text" /></th>
	</tr>
</table>
