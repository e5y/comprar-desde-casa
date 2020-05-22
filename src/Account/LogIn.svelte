<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import { appLoaded, session } from "../stores.js";

  import Layout from "../Layout/Layout.svelte";
  import Heading from "../Utility/Heading.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";

  let form, email, password, isValid, isSubmitting, errorMessage;

  const onSubmit = async e => {
    e.preventDefault();
    errorMessage = "";
    try {
      isSubmitting = true;
      await $session.logIn(email, password);
      isSubmitting = false;
      navigate("/tu-negocio");
    } catch (e) {
      isSubmitting = false;
      if (e.code === "auth/user-not-found") {
        errorMessage = "No encontramos un usuario con ese correo electrónico";
      } else {
        errorMessage = "El usuario o la contraseña son incorrectos";
      }
    }
  };

  const onRegisterClick = e => {
    navigate("/agregar-negocio");
  };

  onMount(() => {
    if ($appLoaded) {
      if ($session.isLoggedIn) navigate("/tu-negocio", { replace: true });
    }
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

<Layout>
  <Heading>Iniciar sesión</Heading>
  <form on:submit={onSubmit} bind:this={form}>
    <input
      type="email"
      placeholder="Correo electrónico *"
      bind:value={email}
      required />
    <input
      type="password"
      placeholder="Contraseña"
      bind:value={password}
      required />
    <button disabled={!isValid || isSubmitting}>
      {#if isSubmitting}
        <Loader size="inherit" />
      {:else}
        <i class="fas fa-sign-in-alt" />
        Iniciar sesión
      {/if}
    </button>
    <button type="button" on:click={onRegisterClick}>
      <i class="fas fa-plus-circle" />
      Registrarse
    </button>
    {#if errorMessage}
      <Info type="error">{errorMessage}</Info>
    {/if}
  </form>
</Layout>
