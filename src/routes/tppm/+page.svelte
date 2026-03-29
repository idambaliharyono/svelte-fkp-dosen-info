<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import Card from "$lib/components/ui/card/card.svelte";
  import type { PageProps } from "../$types";
  import { Info } from "lucide-svelte";
  import Input from "$lib/components/ui/input/input.svelte";

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

<div class="">
  <Input
    placeholder="Cari matakuliah..."
    bind:value={search}
    class="w-full border rounded-md px-5 py-2 text-sm mb-3"
  />
</div>

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
                <span>
                  {item.matakuliah}
                  <sup>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Info class="size-2 text-blue-500" />
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
            <div class="flex gap-1">
              <div>{item.kode} |</div>
              <a href={item.link} class="text-blue-500"> RPS</a>
            </div>
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
