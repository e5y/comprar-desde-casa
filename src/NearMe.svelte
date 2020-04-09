<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import { get } from "geofirex";
  import Layout from "./Layout.svelte";
  import Loader from "./Loader.svelte";
  import Business from "./Business.svelte";
  import Map from "./Map.svelte";
  import Info from "./Info.svelte";
  import { googleMapsLoaded } from "./stores.js";

  const radius = 5;
  let results, currentBusiness, points;

  const fetchResults = async position => {
    // TODO: Remove this (forcing location on desktop)
    position = {
      coords: {
        latitude: -31.4472377,
        longitude: -64.1848462
      }
    };
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
        radius,
        "position"
      );
    results = await get(geoQuery);
    currentBusiness = results[0];
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
    console.log(results);
  };

  const selectBusiness = e => {
    const id = e.detail.id;
    currentBusiness = results.find(result => result.id === id);
  };

  onMount(async () => navigator.geolocation.getCurrentPosition(fetchResults));

  export let category;
  export let db;
  export let geo;
</script>

<style>
  h1 {
    margin-top: 0;
  }
  .category {
    text-transform: capitalize;
  }
</style>

<Layout>
  {#if results}
    {#if results.length}
      {#if category === 'todos'}
        <h1>Cerca mío</h1>
      {:else}
        <h1>
          <span class="category">{category}</span>
          cerca mío
        </h1>
      {/if}
      {#if $googleMapsLoaded}
        <Map {points} on:markerClicked={selectBusiness} />
      {/if}
      <Business business={currentBusiness} />
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
