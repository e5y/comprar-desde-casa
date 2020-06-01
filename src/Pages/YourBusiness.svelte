<script>
  import { onMount } from "svelte";
  import { link, navigate } from "svelte-routing";

  import { appLoaded, db, session } from "../stores.js";

  import { Businesses } from "../classes/Businesses";

  import BusinessCard from "../Business/BusinessCard.svelte";
  import Layout from "../Layout/Layout.svelte";
  import Heading from "../Utility/Heading.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";

  let loaded, pendingBusinesses, approvedBusinesses;

  const addBusiness = () => {
    navigate(`/agregar-negocio/${$session.id}`);
  };

  onMount(async () => {
    if ($session.isLoggedIn) {
      pendingBusinesses = await $db.getPendingBusinessesByOwnerId($session.id);
      approvedBusinesses = await $db.getApprovedBusinessesByOwnerId(
        $session.id
      );
    }
    loaded = true;
  });
</script>

<style>
  h2 {
    font-size: 1.15rem;
    font-weight: 500;
    text-align: center;
  }

  p {
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

  .center {
    text-align: center;
  }

  section {
    margin-bottom: 2rem;
  }

  section:last-child {
    margin-bottom: 0;
  }
</style>

<Heading>Tus negocios</Heading>
{#if loaded}
  {#if $session.isLoggedIn}
    {#if pendingBusinesses && pendingBusinesses.length}
      <Info type="warning">
        Tenés un negocio pendiente de aprobación, te avisaremos cuando esté
        listo.
      </Info>
    {/if}
    {#if approvedBusinesses}
      {#each approvedBusinesses as business}
        <BusinessCard {business} edit={true} />
      {/each}
      <div class="center">
        <button class="button" on:click={addBusiness}>
          <i class="fas fa-plus-circle" />
          Agregar Negocio
        </button>
      </div>
    {/if}
    {#if !pendingBusinesses && !approvedBusinesses}
      <Info>Usted no tiene negocios pendientes ni aprobados.</Info>
    {/if}
    <div class="center">
      <button class="button" on:click={$session.logOut}>Cerrar sesión</button>
    </div>
  {:else}
    <section>
      <h2>Registrate ahora</h2>
      <p>
        Si tenés un negocio que hace envíos, sumalo sin ningún costo ni comisión
        por venta.
      </p>
      <div class="center">
        <a href="/agregar-negocio" use:link class="button">
          <i class="fas fa-plus-circle" />
          Agregar mi negocio
        </a>
      </div>
    </section>
    <section>
      <h2>¿Ya estás registrado?</h2>
      <p>
        Si ya estás registrado, iniciá sesión para modificar los datos de tu
        negocio.
      </p>
      <div class="center">
        <a href="/iniciar-sesion" use:link class="button">
          <i class="fas fa-sign-in-alt" />
          Iniciar sesión
        </a>
      </div>
    </section>
  {/if}
{:else}
  <Loader />
{/if}
