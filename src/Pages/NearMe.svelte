<script>
  import { onMount } from "svelte";

  import { db, session, categories } from "../stores.js";

  import { getPosition } from "../utilities.js";

  import { Businesses } from "../classes/Businesses.js";

  import Layout from "../Layout/Layout.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";
  import Popup from "../Utility/Popup.svelte";
  import Heading from "../Utility/Heading.svelte";

  import BusinessCard from "../Business/BusinessCard.svelte";
  import Map from "../NearMe/Map.svelte";

  export let category;

  let position,
    businesses,
    all = false,
    radius,
    business;

  const originalPathname = window.location.pathname;

  const fetchBusinesses = async () => {
    try {
      position = await getPosition();
    } catch (e) {
      position = false;
      return;
    }

    radius = all ? 650 : 10;

    businesses = null;
    businesses = await $db.getApprovedBusinessesInRadius(
      position,
      radius,
      category
    );
  };

  const viewAll = () => (all = true && fetchBusinesses());

  const openBusiness = ({ detail: { id } }) => {
    business = businesses.find(b => b.id === id);
    history.replaceState(null, document.title, `/negocio/${business.id}`);
  };

  const clearBusiness = () => {
    business = null;
    history.replaceState(null, document.title, originalPathname);
  };

  onMount(fetchBusinesses);
</script>

<style>
  .category {
    text-transform: capitalize;
  }
  .showing-results {
    text-align: center;
    margin: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }
  .showing-results button {
    background: #ff9001;
    color: white;
    border: 0;
    padding: 0.25rem 0.5rem;
    border-radius: 7px;
    font-family: Roboto;
    margin: 0.5rem 0.25rem;
  }

  .enable-location {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .enable-location a {
    padding: 0;
    font-size: 1rem;
  }

  .enable-location i {
    width: 1rem;
  }
</style>

{#if position}
  {#if businesses}
    {#if businesses.length}
      <Heading>
        {#if category === 'todos'}
          Cerca mío
        {:else}
          <span class="category">
            {$categories.find(c => c.id === category).name}
          </span>
          cerca mío
        {/if}
      </Heading>
      <Info id="toca-un-negocio" rest="1d">
        Tocá un negocio en el mapa para ver su información disponible
      </Info>
      <Map {businesses} {position} on:marker={openBusiness} />
      <section class="showing-results">
        Mostrando
        {#if $session.isAdmin}
          <b>{businesses.length}</b>
        {:else}todos los{/if}
        negocios
        {#if !all}
          en un radio de {radius} km
          <button on:click={viewAll}>Ver todos</button>
        {/if}
      </section>
      {#if business}
        <Popup on:close={clearBusiness}>
          <BusinessCard {business} />
        </Popup>
      {/if}
    {:else}
      <Info type="warning">
        Aún no hay negocios cargados cerca tuyo.
        {#if !all}
          Mirá todos los negocios cargados
          <button on:click={viewAll}>haciendo click aquí</button>
        {/if}
      </Info>
    {/if}
  {:else}
    <Loader />
  {/if}
{:else if position === false}
  <Info type="error">
    ¡Oh no! Parece que no tenés habilitada tu ubicación. Revisá la configuración
    de tu dispositivo para ver los negocios que estén cerca
    <b style="margin-top: .5rem;display: inline-block;">
      Cómo habilitar tu ubicación:
    </b>
    <ul class="enable-location">
      <li>
        <i class="fab fa-android" />
        <a
          target="_blank"
          href="https://support.google.com/nexus/answer/3467281?hl=es">
          En Android
        </a>
      </li>
      <li>
        <i class="fab fa-apple" />
        <a target="_blank" href="https://support.apple.com/es-lamr/HT207092">
          En iOS (iPhone/iPad)
        </a>
      </li>
    </ul>
  </Info>
{:else}
  <Loader />
{/if}
