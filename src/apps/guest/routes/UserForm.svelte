<script>
  import { Router, Link, Route, navigate } from "svelte-routing";

  let username = "";

  const handleSubmit = () => {
    if (username) {
      localStorage.setItem("username", username);
      navigate("/playlist", { replace: true });
    }
  };
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
</style>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    name="search"
    placeholder="Username"
    class="nes-input"
    bind:value={username} />
  <button type="submit" class="nes-btn is-primary">Submit</button>
</form>
