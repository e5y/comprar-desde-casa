<script>
  import { onMount } from "svelte";

  import { session } from "../stores.js";

  import Heading from "../Utility/Heading.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";

  export let email = "";

  let form,
    isValid,
    isSubmitting,
    errorMessage,
    sent = false;

  const onSubmit = async () => {
    try {
      isSubmitting = true;
      await $session.sendPasswordReset(email);
    } catch (e) {
      errorMessage = e.message;
    }
    isSubmitting = false;
    sent = true;
  };

  onMount(() => {
    form.addEventListener("input", () => {
      isValid = form.checkValidity();
    });
    form.addEventListener("change", () => {
      form.reportValidity();
    });
  });
</script>

<style>
  form {
    margin-bottom: 1rem;
  }

  input,
  button {
    font-family: Roboto;
    padding: 1rem;
    border: 2px solid black;
    border-radius: 7px;
    margin: 0.25rem 0;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
  }

  button {
    background: black;
    color: white;
  }

  button i {
    margin-right: 0.25rem;
  }

  button:last-child {
    margin-bottom: 1rem;
  }

  button:disabled {
    background: #9e9e9e;
    border-color: #9e9e9e;
    color: white;
  }
</style>

<Heading>Reestablecer contraseña</Heading>
{#if !sent}
  <form on:submit|preventDefault={onSubmit} bind:this={form}>
    <input
      type="email"
      placeholder="Correo electrónico *"
      bind:value={email}
      required />
    <button disabled={!isValid || isSubmitting}>
      {#if isSubmitting}
        <Loader size="inherit" />
      {:else}
        <i class="fas fa-key" />
        Reestablecer contraseña
      {/if}
    </button>
    {#if errorMessage}
      <Info type="error">{errorMessage}</Info>
    {/if}
  </form>
{:else}
  <Info type="success">
    Se envió un correo a
    <b>{email}</b>
    con las intrucciones para reestablecer la contraseña.
  </Info>
{/if}
