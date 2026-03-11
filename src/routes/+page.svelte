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
  import Card from "$lib/components/ui/card/card.svelte";
  import { Car, GroupIcon, Users } from "lucide-svelte";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();

  // Debug: log the structure
  console.log("Data structure:", data);
  console.log("Keys:", Object.keys(data || {}));
</script>

<Card class="p-3">
  <h1 class="font-extrabold text-lg">Tracer Data Prodi Ilmu Kelautan</h1>
  <p class="text-sm text-black/80 -mt-5 text-justify">
    Monitoring data akademik, mutu, skripsi dan tracer study dalam satu tampilan
    mobile. User dapat memantau data paling update. Memudahkan proses birokrasi
    dan komunikasi antara user dan pihak prodi Ilmu Kelautan Fakultas Kelautan
    dan Perikanan Universitas Udayana
  </p>
</Card>

<div class="w-full flex justify-evenly gap-2 mt-3">
  <Card class="w-1/2 px-3 py-4 flex flex-col">
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <p>Total Dosen:</p>
        <h1 class="font-extrabold text-xl ml-4">
          {data.spreadsheet.profil.length}
        </h1>
      </div>
      <Users class="h-10 w-10" />
    </div>
    <h2 class="text-xs -mt-2">Data aktif semester ini</h2>
  </Card>
  <Card class="w-1/2 px-3 py-4 flex flex-col">
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <p>Total Alumni:</p>
        <h1 class="font-extrabold text-xl ml-4">500</h1>
      </div>
      <Users class="h-10 w-10" />
    </div>
    <h2 class="text-xs -mt-2">Data aktif semester ini</h2>
  </Card>
</div>
