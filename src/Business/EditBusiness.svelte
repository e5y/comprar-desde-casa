<script>
  import { onMount } from "svelte";
  import { link, navigate } from "svelte-routing";

  import { db, user } from "../stores.js";
  import { Business } from "../classes/Business.js";

  import Layout from "../Layout/Layout.svelte";
  import BusinessForm from "./BusinessForm.svelte";
  import BusinessCard from "./BusinessCard.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Heading from "../Utility/Heading.svelte";

  export let id;

  let business;
  let sent = false;

  const editBusiness = async () => {
    await $db
      .collection("approved_businesses")
      .doc(id)
      .set(business.export);
    sent = true;
  };

  const deleteBusiness = async () => {
    const confirmed = confirm("¿Estás seguro de que querés borrar el negocio?");
    if (confirmed) {
      await $db
        .collection("approved_businesses")
        .doc(id)
        .delete();
      navigate("/");
    }
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
      console.error("❌ Business could not be fetched", e);
    }
  });
</script>

<style>
  .delete-business {
    font-family: Roboto;
    padding: 1rem;
    border: 2px solid red;
    border-radius: 7px;
    margin: 0.25rem 0;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
    background: red;
    color: white;
  }
</style>

<Layout>
  {#if $user.loggedIn}
    <Heading>Editando negocio</Heading>
    {#if sent}
      <Info type="success">Tu negocio fue editado correctamente.</Info>
    {:else if business}
      <BusinessForm
        bind:business
        bind:user={$user}
        on:submit={editBusiness}
        submitText="Editar" />
      <BusinessCard {business} />
      <button class="delete-business" on:click={deleteBusiness}>Borrar</button>
    {:else}
      <Loader />
    {/if}
  {:else}
    <Info type="error">
      Debes iniciar sesión para editar un negocio.
      <a use:link href="/iniciar-sesion">Iniciar sesión</a>
    </Info>
  {/if}
</Layout>
