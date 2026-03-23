<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
  import type { PageProps } from "../$types";
  import { Car, User } from "lucide-svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  let { data }: PageProps = $props();

  const dosenIk = data.spreadsheet.profil.filter(
    (dosen) => dosen.dosen_ik === "1",
  );
</script>

<div class="grid grid-cols-1 gap-3">
  {#each dosenIk as dosen}
    <Card>
      <div class="w-full flex">
        <div class="w-1/3 flex flex-col justify-center items-center">
          <User class="border rounded-full w-20 h-20 p-5" />
          <div class="flex flex-col gap-3">
            <Button variant="link" class="text-xs">Penelitian(12)</Button>
            <Button variant="outline" class="text-xs">publikasi(2)</Button>
            <Button variant="destructive" class="text-xs">pengabdian(4)</Button>
          </div>
        </div>
        <div class="flex justify-evenly">
          <div class="grid grid-cols-1 text-xs">
            <h1>Nama: {dosen.nama}</h1>
            <h1>NIP: {dosen.nip}</h1>
            <h1>Email: {dosen.email}</h1>
            <h1>Whatsapp: {dosen.whatsapp}</h1>
            <h1>Penempatan: {dosen.penempatan}</h1>
            <h1>Pendidikan Terakhir: {dosen.pendidikan_terakhir}</h1>
            <h1>KBK: {dosen.kbk}</h1>
          </div>
          <!-- <div>publikasi, pengabdian, penelitian</div> -->
        </div>
      </div>
    </Card>
  {/each}
</div>

<!-- <div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem] mx-auto">
  <Item.Root variant="muted">
    <Item.Media>
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title class="line-clamp-1">Under Development</Item.Title>
    </Item.Content>
  </Item.Root>
</div> -->
