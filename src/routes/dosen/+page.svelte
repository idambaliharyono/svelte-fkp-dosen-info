<script lang="ts">
  import type { PageProps } from "../$types";
  import { Car, Mail, Phone, User } from "lucide-svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import Button, {
    buttonVariants,
  } from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import Spinner from "$lib/components/ui/spinner/spinner.svelte";
  import GoogleScholar from "$lib/assets/google-scholar-doctor-of-philosophy-university-google-logo-google-743c4083f26230cd6698b60687d7d963.png";

  let { data }: PageProps = $props();
  const dosenIk = data.spreadsheet.profil.filter(
    (dosen) => dosen.dosen_ik === "1",
  );
  const publikasi = data.spreadsheet.karya_ilmiah;
  const penelitian = data.spreadsheet.penelitian;
  const pengabdian = data.spreadsheet.pengabdian;
  const mengajar = data.spreadsheet.mengajar;

  console.log(mengajar[0]);
  console.log(pengabdian[0]);
  console.log(penelitian[0]);

  // console.log(dosenIk[0]);
</script>

<div class="grid grid-cols-1 gap-3">
  {#each dosenIk as dosen}
    <Card>
      <div class="w-full flex gap-2 px-3">
        <!-- Avatar + Contact -->
        <div class="flex flex-col items-center gap-2 shrink-0">
          <User class="border rounded-lg w-16 h-16 p-4" />
          <div class="flex gap-2">
            <a href="mailto:{dosen.email}"><Mail size={14} /></a>
            <a href="https://wa.me/{dosen.whatsapp}"><Phone size={14} /></a>
          </div>
          <a href="">
            <img src={GoogleScholar} alt="" class="size-6" />
          </a>
        </div>
        <!-- Info table -->
        <div class="grid grid-cols-1 text-[10px] w-full pl-2">
          <span class="font-bold">{dosen.nama}</span>
          <span class="font-bold">{dosen.nip}</span>
          <span class="font-bold text-left"
            >Penempatan: <span class="font-normal">{dosen.penempatan}</span
            ></span
          >

          <span class="font-bold text-left"
            >KBK: <span class="font-normal">{dosen.kbk}</span></span
          >
          <div class="flex justify-center -mb-4 mt-2 -ml-2 w-full">
            <Dialog.Root>
              <Dialog.Trigger
                type="button"
                class={buttonVariants({ variant: "link" })}
              >
                <span class="text-[10px] p-0 h-auto text-blue-500"
                  >Publikasi<sup class="text-[8px]"
                    >({publikasi.filter((row) => row.no_id === dosen.No)
                      .length})</sup
                  >
                </span>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Publikasi / Karya Ilmiah</Dialog.Title>
                  <Dialog.Description>
                    Publikasi oleh {dosen.nama}
                  </Dialog.Description>
                </Dialog.Header>

                <div class="overflow-x-auto max-h-[60vh]">
                  <Table.Root class="text-[10px] w-full">
                    <Table.Header>
                      <Table.Row class="text-center">
                        <Table.Head class="w-14">Tahun</Table.Head>
                        <Table.Head class="w-14">Kategori</Table.Head>
                        <Table.Head class="w-14">Indeks</Table.Head>
                        <Table.Head class="w-[calc(100%-60px)]"
                          >Judul</Table.Head
                        >
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {#each publikasi.filter((row) => row.no_id === dosen.No) as item}
                        <Table.Row>
                          <Table.Cell class="w-14 align-top"
                            >{item.tahun}</Table.Cell
                          >
                          <Table.Cell class="w-14 align-top"
                            >{item.kategori_penulis}</Table.Cell
                          >
                          <Table.Cell class="w-14 align-top"
                            >{item.indeks}</Table.Cell
                          >
                          <Table.Cell class="align-top w-[calc(100%-60px)]">
                            <div class="line-clamp-3 w-full">
                              {item.judul}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      {/each}
                    </Table.Body>
                  </Table.Root>
                </div>
              </Dialog.Content>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger
                type="button"
                class={buttonVariants({ variant: "link" })}
              >
                <span class="text-[10px] p-0 h-auto text-blue-500"
                  >Mengajar<sup class="text-[8px]"
                    >({mengajar.filter((row) => row.no_id === dosen.No)
                      .length})</sup
                  >
                </span>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Mengajar</Dialog.Title>
                  <Dialog.Description>
                    Matakuliah yang di isi oleh {dosen.nama}
                  </Dialog.Description>
                </Dialog.Header>

                <div class="overflow-x-auto max-h-[80vh]">
                  <Table.Root class="text-[10px] w-full">
                    <Table.Header>
                      <Table.Row class="text-center">
                        <Table.Head class="w-14">Tahun</Table.Head>
                        <Table.Head class="w-14">Semester</Table.Head>
                        <Table.Head class="w-[calc(100%-60px)]"
                          >Matakuliah</Table.Head
                        >
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {#each mengajar.filter((row) => row.no_id === dosen.No) as item}
                        <Table.Row>
                          <Table.Cell class="w-14 align-top"
                            >{item.tahun}</Table.Cell
                          >
                          <Table.Cell class="w-14 align-top"
                            >{item.semester}</Table.Cell
                          >
                          <Table.Cell class="align-top w-[calc(100%-60px)]">
                            <div class="line-clamp-3 w-full">
                              {item.matakuliah}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      {/each}
                    </Table.Body>
                  </Table.Root>
                </div>
              </Dialog.Content>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger
                type="button"
                class={buttonVariants({ variant: "link" })}
              >
                <span class="text-[10px] p-0 h-auto text-blue-500"
                  >Penelitian<sup class="text-[8px]"
                    >({penelitian.filter((row) => row.no_id === dosen.No)
                      .length})</sup
                  >
                </span>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Penelitian</Dialog.Title>
                  <Dialog.Description>
                    Penelitian yang telah dilakukan oleh {dosen.nama}
                  </Dialog.Description>
                </Dialog.Header>

                <div>Under Development</div>
                <Spinner />
              </Dialog.Content>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger
                type="button"
                class={buttonVariants({ variant: "link" })}
              >
                <span class="text-[10px] p-0 h-auto text-blue-500"
                  >Pengabdian<sup class="text-[8px]"
                    >({pengabdian.filter((row) => row.no_id === dosen.No)
                      .length})</sup
                  >
                </span>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Pengabdian</Dialog.Title>
                  <Dialog.Description>
                    Pengabdian yang di telah dilakukan oleh {dosen.nama}
                  </Dialog.Description>
                </Dialog.Header>

                <div>Under Development</div>
                <Spinner />
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div></Card
    >
  {/each}
</div>
