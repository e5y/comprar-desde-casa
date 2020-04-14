<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import { get } from "geofirex";
  import Layout from "../Layout/Layout.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Business from "../Business/Business.svelte";
  import Info from "../Utility/Info.svelte";
  import { googleMapsLoaded } from "../stores.js";
  import Map from "./Map.svelte";

  export let category;
  export let categories;
  export let db;
  export let geo;

  const radius = 5;
  let results, currentBusiness, points;
  let showingAll = false;

  const fetchResults = async (position, r) => {
    const firestoreQuery =
      category === "todos"
        ? db.collection("approved_businesses")
        : db
            .collection("approved_businesses")
            .where("category", "==", category);
    const geoQuery = geo
      .query(firestoreQuery)
      .within(
        geo.point(position.coords.latitude, position.coords.longitude),
        r || radius,
        "position"
      );
    results = null;
    results = await get(geoQuery);
    points = [
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        id: "user",
        category: "user"
      },
      ...results.map(business => ({
        category: business.category,
        lat: business.position.geopoint.latitude,
        lng: business.position.geopoint.longitude,
        id: business.id
      }))
    ];
  };

  const selectBusiness = e => {
    const id = e.detail.id;
    currentBusiness = results.find(result => result.id === id);
  };

  const viewAll = () => {
    showingAll = true;
    navigator.geolocation.getCurrentPosition(position =>
      fetchResults(position, 100)
    );
  };

  onMount(async () => navigator.geolocation.getCurrentPosition(fetchResults));
</script>

<style>
  h1 {
    margin-top: 0;
  }
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
</style>

<Layout>
  {#if results}
    {#if results.length}
      {#if category === 'todos'}
        <h1>Cerca mío</h1>
      {:else}
        <h1>
          <span class="category">
            {categories.docs.find(c => c.id === category).data().name}
          </span>
          cerca mío
        </h1>
      {/if}
      <Info id="toca-un-negocio" rest="1d">
        Tocá un negocio en el mapa para ver su información disponible
      </Info>
      {#if $googleMapsLoaded}
        <Map {points} on:markerClicked={selectBusiness} />
      {/if}
      {#if !showingAll}
        <section class="showing-results">
          Mostrando resultados en un radio de {radius} km
          <button on:click={viewAll}>Ver todos</button>
        </section>
      {/if}
      {#if currentBusiness}
        <Business business={currentBusiness} {categories} />
      {/if}
    {:else}
      <Info type="error">
        No encontramos negocios cerca.
        <Link to="/">Volver</Link>
      </Info>
    {/if}
  {:else}
    <Loader />
  {/if}

</Layout>
