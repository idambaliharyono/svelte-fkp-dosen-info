<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import unudLogo from "$lib/assets/UNUD (Universitas Udayana) Bali Logo (SVG) - Vector69Com.svg";
  import type { LayoutProps } from "./$types";
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button";
  import Card from "$lib/components/ui/card/card.svelte";
  import { Bell } from "lucide-svelte";

  let { data, children }: LayoutProps = $props();
  let currentPath = $derived(page.url.pathname);
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dosen", label: "Dosen" },
    { path: "/tppm", label: "TPPM" },
    { path: "/skripsi", label: "Skripsi" },
    { path: "/pkm", label: "PKM" },
    { path: "/tracerStudi", label: "Tracer Studi" },
  ];

  function getVariant(path: string) {
    return currentPath === path ? "default" : "outline";
  }
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="max-w-sm mx-auto border border-black/5 h-screen py-2">
  <div class="flex justify-between">
    <div class="flex">
      <img src={unudLogo} alt="" class="size-15 grayscale-100" />
      <div class="flex flex-col ml-2 mt-1.5">
        <h1 class="text-xl font-extrabold">SIDATA-IK</h1>
        <p class="text-sm text-black/80 -mt-1">Prodi Ilmu Kelautan</p>
      </div>
    </div>
    <div class="px-3 py-1 flex justify-center my-auto">
      <Bell class="h-7 w-7" />
    </div>
  </div>
  <div class="flex overflow-auto py-3 gap-3 my-2">
    {#each navItems as item}
      <Button href={item.path} variant={getVariant(item.path)}
        >{item.label}</Button
      >
    {/each}
  </div>
  {@render children()}
</div>
