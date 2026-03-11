<script lang="ts">
  import Card from "$lib/components/ui/card/card.svelte";
  import {
    Calendar,
    FileText,
    GraduationCap,
    Lightbulb,
    Users,
  } from "lucide-svelte";
  import type { PageProps } from "./$types";
  import * as Table from "$lib/components/ui/table/index.js";
  let { data }: PageProps = $props();

  // Debug: log the structure
  console.log("Data structure:", data);
  console.log("Keys:", Object.keys(data || {}));

  const outlineContents = [
    {
      icon: Users,
      label: "Total Dosen",
      value: data.spreadsheet.profil.length,
      subtitle: "Data aktif semester ini",
      size: "h-10 w-10",
    },
    {
      icon: FileText,
      label: "RPS TPPM",
      value: "98%",
      subtitle: "Dokumen terunggah",
      size: "h-10 w-10",
    },
    {
      icon: Calendar,
      label: "Sidang Bulan ini",
      value: "14",
      subtitle: "Sudah terjadwal",
      size: "h-10 w-10",
    },
    {
      icon: GraduationCap,
      label: "Alumni Terlacak",
      value: "842",
      subtitle: "Hasil tracer",
      size: "h-10 w-10",
    },
  ];

  const dosenTotalPublication = data.spreadsheet.profil.map((dosen) => {
    console.log("dosen Nip", dosen.nip);
    const jumlahPublikasi = data.spreadsheet.karya_ilmiah.filter(
      (pub) => pub.nip === dosen.nip,
    ).length;

    return {
      nama: dosen.nama,
      kbk: dosen.kbk,
      total: jumlahPublikasi,
    };
  });
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

<div class="grid grid-cols-2 gap-2 mt-2">
  {#each outlineContents as content}
    <Card class="px-3 py-4 flex flex-col">
      <div class="flex justify-between">
        <div class="flex flex-col gap-2">
          <p class="font-bold tracking-tighter">{content.label}:</p>
          <h1 class="font-extrabold text-xl ml-4">
            {content.value}
          </h1>
        </div>
        <svelte:component this={content.icon} class={content.size} />
      </div>
      <h2 class="text-xs -mt-2">{content.subtitle}</h2>
    </Card>
  {/each}
</div>
<Card class="px-2 mt-2">
  <div class="flex">
    <Lightbulb />
    <h1 class="ml-2 font-bold tracking-tight">Kinerja Publikasi Dosen</h1>
  </div>

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Nama Dosen</Table.Head>
        <Table.Head>KBK</Table.Head>
        <Table.Head class="text-center">Total Publikasi</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each dosenTotalPublication as item}
        <Table.Row>
          <Table.Cell>{item.nama}</Table.Cell>
          <Table.Cell>{item.kbk}</Table.Cell>
          <Table.Cell class="text-center">{item.total}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</Card>
