<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import unudLogo from "$lib/assets/UNUD (Universitas Udayana) Bali Logo (SVG) - Vector69Com.svg";
  import type { LayoutProps } from "./$types";
  import { page } from "$app/state";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";

  let { data, children }: LayoutProps = $props();
  let currentPath = $derived(page.url.pathname);
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dosen", label: "Dosen" },
    { path: "/publikasi", label: "Publikasi" },
    { path: "/penelitian", label: "Penelitian" },
    { path: "/skripsi", label: "Pengabdian" },
  ];

  function getVariant(path: string) {
    return currentPath === path ? "default" : "outline";
  }
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="max-w-sm mx-auto border border-black/5 h-screen p-1">
  <div class="flex">
    <div class="flex">
      <img src={unudLogo} alt="" class="size-12 grayscale-100" />
      <div class="flex flex-col ml-2">
        <h1 class="text-xl font-extrabold">SIDATA-IK</h1>
        <p class="text-sm text-black/80">Prodi Ilmu Kelautan</p>
      </div>
    </div>
  </div>
  <div class="flex overflow-auto py-3 gap-3">
    {#each navItems as item}
      <Button href={item.path} variant={getVariant(item.path)}
        >{item.label}</Button
      >
    {/each}
  </div>
  {@render children()}
</div>
