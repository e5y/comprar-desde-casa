<script>
  import { onMount } from "svelte";

  import { googleMapsLoaded, user, categories, db, geo } from "../stores.js";

  import { Businesses } from "../classes/Businesses.js";

  import Layout from "../Layout/Layout.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";
  import Popup from "../Utility/Popup.svelte";
  import Heading from "../Utility/Heading.svelte";

  import BusinessCard from "../Business/BusinessCard.svelte";
  import Map from "./Map.svelte";

  import { get } from "geofirex";

  export let category;

  let businesses,
    business,
    position,
    error = false,
    all = false,
    radius = 10;

  const originalPathname = window.location.pathname;

  const fetchBusinesses = async () => {
    try {
      position = await getPosition();
    } catch {
      return;
    }

    businesses = null;

    const query =
      category === "todos"
        ? $db.collection("approved_businesses")
        : $db
            .collection("approved_businesses")
            .where("category", "==", category);

    const geoQuery = $geo
      .query(query)
      .within(
        $geo.point(position.coords.latitude, position.coords.longitude),
        all ? 650 : radius,
        "position"
      );

    // TODO: Remove Geofirex and replace with Geofirestore-js, will break Businesses and Business classes
    businesses = new Businesses(await get(geoQuery), true);
  };

  const viewAll = () => (all = true && fetchBusinesses());

  const getPosition = () =>
    new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        position => res(position),
        e => rej(e),
        { enableHighAccuracy: true }
      );
    });

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

<Layout>
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
        {#if $googleMapsLoaded}
          <Map {businesses} {position} on:marker={openBusiness} />
        {/if}
        <section class="showing-results">
          Mostrando
          {#if $user.isAdmin()}
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
  {:else}
    <Info type="error">
      ¡Oh no! Parece que no tenés habilitada tu ubicación. Revisá la
      configuración de tu dispositivo para ver los negocios que estén cerca
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
  {/if}
</Layout>
