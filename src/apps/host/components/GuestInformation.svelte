<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let ip = "";

  onMount(() => {
    axios({
      method: "GET",
      url: "/server-info"
    })
      .then(({ data }) => (ip = data.ip))
      .catch(error => console.log({ error }));
  });
</script>

<style>
  h2 {
    text-align: center;
  }

  .qr-wrapper {
    text-align: center;
    margin-bottom: 30px;
  }
  .qr-wrapper img {
    width: 250px;
    height: auto;
  }
</style>

<div class="qr-wrapper">
  <img src="/qrcode.png" alt="Qrcode as link to server" />
</div>

<h2 class="nes-text">DJ is on floor http://{ip}:{process.env.PORT}</h2>
