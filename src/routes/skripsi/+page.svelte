<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import Button from "$lib/components/ui/button/button.svelte";

  const skripsiItem = [
    {
      title: "Proposal Skripsi",
      pendaftaran:
        "https://docs.google.com/forms/d/1o-XVUrT_iTd2JtpI9q9yyM8n-19BBOcDW_5BxgG8Sso/edit?usp=forms_home&ouid=101358714180893217466&ths=true",
      hasilUjian:
        "https://docs.google.com/forms/d/1GvHDpkVkLwC-Sl2lpg2P_YVg8M1Ydf_dj_oZW53aiYs/edit",
      hasilRevisi:
        "https://docs.google.com/forms/d/1DcS8sceHMwhgAbu9mYTb2mTpPxK-x_MLwj-c3csrHbk/edit?usp=forms_home&ouid=101358714180893217466&ths=true",
    },
    {
      title: "Seminar Hasil",
      pendaftaran:
        "https://docs.google.com/forms/d/1UuvjHqTGHP3gMQhojJMXcIAqjCgctqwk9bI8_Mc8bDM/",
      hasilUjian:
        "https://docs.google.com/forms/d/1K-jVCUB9POG00DV169pfFsMcYzG2uFuilhDAhaBwai8/edit",
      hasilRevisi:
        "https://docs.google.com/forms/d/10mvCIlsgWkTkIGRTTpQqawM-ZSoSl25EzO0882E_KCA/edit",
    },
    {
      title: "Sidang Skripsi",
      pendaftaran:
        "https://docs.google.com/forms/d/1E6_-cV6FETqZdsgP4-g0mw_laB_PGrRQClHdYHjXKpc/edit",
      hasilUjian:
        "https://docs.google.com/forms/d/1cosp8ndLziv9dp3vaa8A-o-jFmnXajZPcKxh2eBA3A8/edit",
      hasilRevisi:
        "https://docs.google.com/forms/d/1r-X43IGD3nyzTF4bBDPmn1umysfU2I_dANKagC6fSLQ/edit",
    },
  ];
</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Description
      >Kumpulan link pendaftaran, hasil ujian, dan hasil perbaikan skripsi</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <Accordion.Root type="multiple">
      {#each skripsiItem as item}
        <Accordion.Item value={item.title}>
          <Accordion.Trigger class="text-sm font-medium">
            {item.title}
          </Accordion.Trigger>
          <Accordion.Content>
            <div class="flex flex-col divide-y text-sm">
              <div class="flex items-center justify-between py-2 px-1">
                <span class="text-muted-foreground">Pendaftaran</span>
                <a
                  href={item.pendaftaran}
                  class="text-blue-500 hover:underline text-xs">Buka ↗</a
                >
              </div>
              <div class="flex items-center justify-between py-2 px-1">
                <span class="text-muted-foreground">Hasil ujian (3 harian)</span
                >
                <a
                  href={item.hasilUjian}
                  class="text-blue-500 hover:underline text-xs">Buka ↗</a
                >
              </div>
              <div class="flex items-center justify-between py-2 px-1">
                <span class="text-muted-foreground"
                  >Hasil perbaikan (21 harian)</span
                >
                <a
                  href={item.hasilRevisi}
                  class="text-blue-500 hover:underline text-xs">Buka ↗</a
                >
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </Card.Content>
</Card.Root>
