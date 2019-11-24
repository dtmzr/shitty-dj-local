<script>
  import { createEventDispatcher } from "svelte";
  import { formatDuration } from "./utils";

  const dispatch = createEventDispatcher();

  export let name;
  export let duration_ms;
  export let artists;
  export let username;
  export let first;

  const formattedDuration = formatDuration(duration_ms);

  const handleClick = () => dispatch("click", $$props);
</script>

<style>
  .nes-container {
    margin-bottom: 30px !important;
  }

  .nes-text {
    margin-right: 30px;
  }
</style>

<div
  class="nes-container with-title nes-pointer"
  class:is-dark={first}
  on:click={handleClick}>
  <h2 class="title">{name}</h2>
  <p class="nes-text">
    {formattedDuration}
    {#if username}by {username}{/if}
  </p>
  {#each artists as artist}
    <span class="nes-text is-dark">{artist.name}</span>
  {/each}
</div>
