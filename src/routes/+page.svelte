<!-- <script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h1>spreadsheet data test</h1>
<pre>{JSON.stringify(data, null)}</pre>
{#each data.profil as dosen}
  <h2>{dosen.name}</h2>
  <h3>{dosen.nip}</h3>
{/each}

<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p> -->
<!-- src/routes/test/+page.svelte -->
<!-- src/routes/test/+page.svelte -->
<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();

  // Debug: log the structure
  console.log("Data structure:", data);
  console.log("Keys:", Object.keys(data || {}));
</script>

<h1>📊 Spreadsheet Data</h1>
<h1>jumlah dosen: {data.spreadsheet.profil.length}</h1>
<h1>total publikasi: {data.spreadsheet.karya_ilmiah.length}</h1>
<h1>total penelitian: {data.spreadsheet.penelitian.length}</h1>
