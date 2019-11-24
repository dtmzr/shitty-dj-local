<script>
  import { link } from "svelte-routing";

  export let location;
</script>

<style>
  .view-nav {
    text-align: center;
    margin-bottom: 20px;
  }
</style>

<div class="view-nav">
  <a
    href="/playlist"
    class="nes-btn"
    class:is-primary={location.pathname == '/playlist'}
    use:link
    replace>
    Playlist
  </a>
  <a
    href="/search"
    class="nes-btn"
    class:is-primary={location.pathname == '/search'}
    use:link
    replace>
    Add track
  </a>
</div>
