<script>
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { Router, Link, Route, navigate } from "svelte-routing";
  import io from "socket.io-client";

  import AppHeader from "../../shared/AppHeader";
  import UserForm from "./routes/UserForm";
  import Search from "./routes/Search";
  import Playlist from "./routes/Playlist";

  export let routerUrl = "";

  let socket = null;
  let username = "";
  let tracks = [];

  onMount(() => {
    username = localStorage.getItem("username");
    if (username) {
      navigate("/playlist", { replace: true });
    }

    socket = io.connect("/");
    socket.on("tracks", remoteTracks => {
      tracks = remoteTracks;
    });
  });

  onDestroy(() => {
    if (socket) {
      socket.disconnect();
    }
  });

  const addTrack = track => {
    if (!socket) {
      window.alert("It seems like you dont have a connection");
    } else {
      socket.emit("new_track", { ...track, username });
      navigate("/playlist", { replace: true });
    }
  };
</script>

<div class="container">
  <AppHeader />
  <Router {routerUrl}>
    <Route path="/playlist" component={Playlist} {tracks} />
    <Route path="/search" component={Search} {addTrack} />
    <Route path="/" component={UserForm} />
  </Router>
</div>
