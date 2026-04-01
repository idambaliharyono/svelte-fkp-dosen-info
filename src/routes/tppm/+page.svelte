<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import Card from "$lib/components/ui/card/card.svelte";
  import type { PageProps } from "../$types";
  import { Info, Search } from "lucide-svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

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
  let search = $state("");
  const filtered = $derived(
    matakuliah.filter((row) =>
      row.matakuliah.toLowerCase().includes(search.toLowerCase()),
    ),
  );
</script>

{#await data.spreadsheet}
  <Spinner />
{:then spreadsheet}
  <div class="relative mb-2">
    <Search
      class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
    />
    <Input
      class="pl-9 rounded-full"
      bind:value={search}
      type="text"
      placeholder="Cari matakuliah..."
    />
  </div>
  <!-- <div class="">
  <Input
    placeholder="Cari matakuliah..."
    bind:value={search}
    class="w-full border rounded-md px-5 py-2 text-sm mb-3"
  />
</div> -->

  <Card>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Matakuliah</Table.Head>
          <Table.Head>SKS</Table.Head>
          <!-- <Table.Head class="text-center">Dosen</Table.Head> -->
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each filtered as item}
          <Table.Row>
            <Table.Cell>
              <div>
                <div class="inline-flex items-center gap-1">
                  <span class="font-semibold">
                    {item.matakuliah}
                    <sup>
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button variant="link" class="-ml-3">
                            <Info class="size-2.5 text-blue-500" />
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>Dosen Pengempu</Dialog.Title>
                            <Dialog.Description>
                              Koordinator: {item.korrdinator}
                            </Dialog.Description>
                          </Dialog.Header>
                          {#each dosenMatakuliah.filter((row) => row.matakuliah === item.matakuliah && row.nama !== item.korrdinator) as anggota}
                            <div>{anggota.nama}</div>
                          {/each}
                        </Dialog.Content>
                      </Dialog.Root>
                    </sup>
                  </span>
                </div>
              </div>
              <div class="flex gap-1 font-light">
                <div>{item.kode} |</div>
                <a href={item.link} class="text-blue-500"> RPS </a>
              </div>
              {#if item.pembaharuan.length > 1}
                <div class="text-xs font-light">
                  RPS updated at: {item.pembaharuan}
                </div>
              {/if}
            </Table.Cell>
            <Table.Cell class="text-center">{item.sks_total}</Table.Cell>
            <!-- <Table.Cell>
            <div>{item.korrdinator} (Koordinator)</div>
            {#each dosenMatakuliah.filter((row) => row.matakuliah === item.matakuliah) as anggota}
              <div>{anggota.nama}</div>
            {/each}
          </Table.Cell> -->
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card>
{/await}
