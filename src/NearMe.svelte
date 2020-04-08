<script>
  import { onMount } from "svelte";
  import Layout from "./Layout.svelte";
  import Loader from "./Loader.svelte";
  import Business from "./Business.svelte";
  import Map from "./Map.svelte";
  import { get } from "geofirex";

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
        ? db.collection("businesses")
        : db.collection("businesses").where("category", "==", category);
    const geoQuery = geo
      .query(firestoreQuery)
      .within(
        geo.point(position.coords.latitude, position.coords.longitude),
        radius,
        "position"
      );
    results = await get(geoQuery);
    currentBusiness = results[0];
    points = results.map(business => ({
      lat: business.position.geopoint.latitude,
      lng: business.position.geopoint.longitude,
      id: business.id
    }));
    console.log(results);
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
    {#if category === 'todos'}
      <h1>Cerca mío</h1>
    {:else}
      <h1>
        <span class="category">{category}</span>
        cerca mío
      </h1>
    {/if}
    <Business business={currentBusiness} />
    <Map {points} />
  {:else}
    <Loader />
  {/if}

</Layout>
