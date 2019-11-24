<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import axios from "axios";

  import Nav from "../components/Nav";
  import TrackItem from "../../../shared/TrackItem";

  export let location;
  export let addTrack;

  let searchTerm = "";
  let tracks = [];

  const handleSubmit = () => {
    axios({
      method: "GET",
      url: "/search-tracks",
      params: {
        term: searchTerm
      }
    })
      .then(({ data }) => {
        tracks = data.tracks.items;
        searchTerm = "";
      })
      .catch(error => console.log({ error }));
  };

  const handleClick = event => addTrack(event.detail);
</script>

<style>
  form {
    display: flex;
    width: 100%;
    flex-direction: row;
  }

  form input {
    margin-right: 10px;
  }

  .search-results {
    margin-top: 60px;
  }
</style>

<Nav {location} />
<div class="track-search">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      name="search"
      placeholder="Song title..."
      class="nes-input"
      bind:value={searchTerm} />
    <button type="submit" class="nes-btn">Search</button>
  </form>
  <div class="search-results">
    {#if tracks.length > 0}
      {#each tracks as track}
        <TrackItem {...track} on:click={handleClick} />
      {/each}
    {:else}
      <p class="nes-text">No tracks found...</p>
    {/if}
  </div>
</div>
