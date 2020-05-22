<script>
  import { onMount } from "svelte";
  import { link, navigate } from "svelte-routing";

  import { db, session } from "../stores.js";
  import { Business } from "../classes/Business.js";

  import Layout from "../Layout/Layout.svelte";
  import BusinessForm from "../Business/BusinessForm.svelte";
  import BusinessCard from "../Business/BusinessCard.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Heading from "../Utility/Heading.svelte";

  export let id;

  let business, owner;
  let sent = false;

  onMount(async () => {
    try {
      business = await $db.getApprovedBusiness(id);
      owner = await $db.getOwner(business);
    } catch (e) {
      // TODO: Handle errors better 😢
      console.error("❌ Business could not be fetched", e);
    }
  });

  const editBusiness = async () => {
    try {
      if ($session.isLoggedIn && owner.password) {
        await $session.updatePassword(owner.password);
      }
      await $db.updateApprovedBusiness(business);
      sent = true;
    } catch (e) {
      // TODO: Handle errors better 😢
      // URGENT: Handle error where recent login is required while editing password
      console.error("❌ Business could not be edited", e);
    }
  };

  const deleteBusiness = async () => {
    const confirmed = confirm("¿Estás seguro de que querés borrar el negocio?");
    if (confirmed) {
      try {
        await $db.deleteApprovedBusiness(business);
        navigate("/");
      } catch (e) {
        // TODO: Handle errors better 😢
        console.error("❌ Business could not be deleted", e);
      }
    }
  };
</script>

<style>
  .delete-business,
  .log-out {
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

  .log-out {
    border-color: black;
    background: black;
  }
</style>

{#if $session.isLoggedIn}
  <Heading>Editando negocio</Heading>
  {#if sent}
    <Info type="success">Tu negocio fue editado correctamente.</Info>
  {:else if business && owner}
    <BusinessForm
      bind:business
      bind:owner
      on:submit={editBusiness}
      submitText="Editar" />
    <BusinessCard {business} />
    <button class="log-out" on:click={$session.logOut}>Cerrar sesión</button>
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
