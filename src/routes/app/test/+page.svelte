<script lang="ts">
  import { onMount } from 'svelte';

  let div1: HTMLDivElement;
  let div2: HTMLDivElement;

  function handleScroll1() {
    div2.scrollTop = div1.scrollTop;
    div2.scrollLeft = div1.scrollLeft;
  }

  function handleScroll2() {
    div1.scrollTop = div2.scrollTop;
    div1.scrollLeft = div2.scrollLeft;
  }

  onMount(() => {
    div1.addEventListener('scroll', handleScroll1);
    div2.addEventListener('scroll', handleScroll2);
  });
</script>

<style>
  #div1,
  #div2 {
    float: left;
    overflow: auto;
    height: 50px;
    width: 200px;
  }
</style>

<div id="div1" bind:this={div1} on:scroll={handleScroll1} style="overflow:auto;height:100px;width:200px;">
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
</div>

<div id="div2" bind:this={div2} on:scroll={handleScroll2} style="overflow:auto;height:100px;width:200px;">
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
  <p>lulz</p>
</div>
