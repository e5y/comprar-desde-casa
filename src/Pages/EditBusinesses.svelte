<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { db, session } from "../stores.js";
  import BusinessCard from "../Business/BusinessCard.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Heading from "../Utility/Heading.svelte";

  export let id;

  let businesses;

  const addBusiness = () => {
    navigate(`/agregar-negocio/${id}`);
  };

  onMount(async () => {
    businesses = await $db.getApprovedBusinessesByOwnerId(id);
  });
</script>

<style>
  .center {
    text-align: center;
  }
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: orange;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    color: white;
    text-decoration: none;
    font-family: inherit;
    font-weight: 500;
    font-size: inherit;
    margin: 0.5rem 0;
    border: 0;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  .button i {
    margin-right: 0.5rem;
  }
</style>

<Heading>Editar negocios</Heading>
{#if businesses}
  {#each businesses as business}
    <BusinessCard {business} edit={true} />
  {/each}
  <div class="center">
    <button class="button" on:click={addBusiness}>
      <i class="fas fa-plus-circle" />
      Agregar Negocio
    </button>
  </div>
  <div class="center">
    <button class="button" on:click={$session.logOut}>
      <i class="fas fa-sign-out-alt" />
      Cerrar sesión
    </button>
  </div>
{:else}
  <Loader />
{/if}
