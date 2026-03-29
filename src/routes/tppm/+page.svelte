<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import Card from "$lib/components/ui/card/card.svelte";
  import type { PageProps } from "../$types";

  let { data }: PageProps = $props();

  const matakuliah = data.spreadsheet.matakuliah.filter((row) =>
    ["2", "4", "6", "genap"].includes(row.semester),
  );

  const dosenMatakuliah = data.spreadsheet.mengajar.map((row) => {
    return {
      nama: row.nama,
      matakuliah: row.matakuliah,
    };
  });
</script>

<Card>
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Matakuliah</Table.Head>
        <Table.Head>SKS</Table.Head>
        <Table.Head class="text-center">Dosen</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each matakuliah as item}
        <Table.Row>
          <Table.Cell>
            <div>{item.matakuliah}</div>
            <div class="flex gap-1">
              <div>{item.kode}</div>
              <a href={item.link} class="text-blue-500">/ RPS</a>
            </div>
          </Table.Cell>
          <Table.Cell class="text-center">{item.sks_total}</Table.Cell>
          <Table.Cell>
            <div>{item.korrdinator} (Koordinator)</div>
            {#each dosenMatakuliah.filter((row) => row.matakuliah === item.matakuliah) as anggota}
              <div>{anggota.nama}</div>
            {/each}
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</Card>

<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
  <Item.Root variant="muted">
    <Item.Media>
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title class="line-clamp-1"
        >semesester 2,4,6,genap saja, sks tottal saja</Item.Title
      >
    </Item.Content>
    <Item.Content class="flex-none justify-end">
      <!-- <span class="text-sm tabular-nums">$100.00</span> -->
    </Item.Content>
  </Item.Root>
</div>
