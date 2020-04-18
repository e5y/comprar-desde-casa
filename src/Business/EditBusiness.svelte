<script>
  import { onMount } from "svelte";
  import { link } from "svelte-routing";

  import { loggedIn, db } from "../stores.js";
  import { Business } from "../classes/Business.js";

  import Layout from "../Layout/Layout.svelte";
  import BusinessForm from "./BusinessForm.svelte";
  import BusinessCard from "./BusinessCard.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";

  export let id;

  let business;
  let sent = false;

  const editBusiness = () => {
    $db
      .collection("approved_businesses")
      .doc(id)
      .set(business.export);
    sent = true;
  };

  onMount(async () => {
    try {
      business = new Business(
        await $db
          .collection("approved_businesses")
          .doc(id)
          .get()
      );
    } catch (e) {
      // TODO: Handle errors better 😢
      console.error(e);
    }
  });
</script>

<style>
  h1 {
    margin-top: 0;
  }
</style>

<Layout>
  {#if $loggedIn}
    <h1>Editando negocio</h1>
    {#if sent}
      <Info type="success">Tu negocio fue editado correctamente.</Info>
    {:else if business}
      <BusinessForm
        bind:business
        on:submit={editBusiness}
        submitText="Editar" />
      <BusinessCard {business} />
    {:else}
      <Loader />
    {/if}
  {:else}
    <Info type="error">
      Debes iniciar sesión para editar un negocio.
      <a use:link href="/admin">Ir al panel de administrador</a>
    </Info>
  {/if}
</Layout>
