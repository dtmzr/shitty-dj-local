<script>
  import { onMount, onDestroy } from "svelte";
  import io from "socket.io-client";
  import axios from "axios";

  import GuestInformation from "./components/GuestInformation";
  import LoginLink from "./components/LoginLink";
  import AppHeader from "../../shared/AppHeader";
  import Playlist from "../../shared/Playlist";

  const credentials = {
    token_code: null,
    refresh_token: null
  };

  let player = null;
  let socket = null;
  let tracks = [];

  onMount(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const urlParams = new URLSearchParams(window.location.search);
      credentials.token_code = urlParams.get("code");

      if (!credentials.token_code) {
        return;
      }

      player = new Spotify.Player({
        name: "Shitty DJ Player",
        getOAuthToken: getOAuthToken
      });

      // Rewrite history to remove code from url
      window.history.replaceState({}, document.title, "/host");

      // Error handling
      player.addListener("initialization_error", ({ message }) =>
        console.error(message)
      );
      player.addListener("authentication_error", ({ message }) =>
        console.error(message)
      );
      player.addListener("account_error", ({ message }) =>
        console.error(message)
      );
      player.addListener("playback_error", ({ message }) =>
        console.error(message)
      );

      // Playback status updates
      player.addListener("player_state_changed", state => {
        const { paused, restrictions } = state;
        if (
          paused &&
          restrictions.disallow_pausing_reasons &&
          restrictions.disallow_pausing_reasons.includes("already_paused")
        ) {
          socket.emit("remove_track");
        }
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);

        if (tracks.length > 0) {
          play(tracks[0].uri);
        }
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) =>
        console.log("Device ID has gone offline", device_id)
      );

      // Connect to the player!
      player.connect();
    };

    socket = io.connect("/");
    socket.on("tracks", async remoteTracks => {
      tracks = remoteTracks;

      if (player) {
        try {
          const playerState = await player.getCurrentState();
          const couldPlay = !playerState || (playerState && playerState.paused);

          if (couldPlay && tracks.length > 0) {
            play(tracks[0].uri);
          }
        } catch (error) {
          console.log({ error });
        }
      }
    });

    window.socket = socket;
    window.removeCurrentTrack = () => socket.emit("remove_track");
    window.saveTracks = () => {
      localStorage.setItem("state", JSON.stringify(tracks));
    };
    window.loadTracks = () => {
      const loadedTracks = localStorage.getItem("state");

      if (loadedTracks) {
        socket.emit("load_tracks", JSON.parse(loadedTracks));
      }
    };
  });

  onDestroy(() => {
    if (socket) {
      socket.disconnect();
    }
  });

  const getOAuthToken = async callback => {
    try {
      const reqBody = credentials.refresh_token
        ? {
            grant_type: "refresh_token",
            refresh_token: credentials.refresh_token
          }
        : {
            grant_type: "authorization_code",
            code: credentials.token_code
          };

      const { data } = await axios({
        method: "POST",
        url: "/spotify-auth",
        data: reqBody
      });

      if (!credentials.refresh_token) {
        credentials.refresh_token = data.refresh_token;
      }
      callback(data.access_token);
    } catch (error) {
      console.error({ error });
    }
  };

  const removeTrack = track => {
    if (!socket) {
      window.alert("It seems like you dont have a connection");
    } else {
      socket.emit("remove_track", track);
    }
  };

  const play = spotify_uri => {
    player._options.getOAuthToken(async auth_token => {
      try {
        await axios({
          method: "PUT",
          url: "https://api.spotify.com/v1/me/player/play",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`
          },
          params: {
            device_id: player._options.id
          },
          data: JSON.stringify({ uris: [spotify_uri] })
        });
      } catch (error) {
        console.log({ error });
        const skipSong = window.confirm(
          "The current song couldn't be played, should we skip it?"
        );

        if (skipSong) {
          socket.emit("remove_track");
        }
      }
    });
  };
</script>

<div class="container">
  <AppHeader />
  <GuestInformation />
  {#if !credentials.token_code}
    <LoginLink />
  {/if}
  <Playlist {tracks} />
</div>
