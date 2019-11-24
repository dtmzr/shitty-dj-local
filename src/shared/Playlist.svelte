<script>
  import TrackItem from "./TrackItem";

  export let tracks = [];
</script>

<style>
  .playlist :global(.track-item:hover) {
    background: transparent !important;
  }

  .playlist :global(.track-item:first-of-type) {
    background: lightgray !important;
  }

  .playlist > p {
    text-align: center;
  }
</style>

<div class="playlist">
  {#if tracks.length > 0}
    {#each tracks as track, i}
      <TrackItem {...track} first={i == 0} />
    {/each}
  {:else}
    <p>C'mon we need some tracks...</p>
  {/if}
</div>
