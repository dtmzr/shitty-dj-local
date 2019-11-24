<script>
  import { onMount } from "svelte";

  import Nav from "../components/Nav";
  import Playlist from "../../../shared/Playlist";

  export let location;
  export let tracks;
</script>

<Nav {location} />
<Playlist {tracks} />
