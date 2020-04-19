<script>
  import { onMount } from "svelte";

  import { db } from "../stores.js";
  import { Business } from "../classes/Business.js";

  import Layout from "../Layout/Layout.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";

  import BusinessCard from "./BusinessCard.svelte";
  import Map from "../NearMe/Map.svelte";

  export let id;

  let business, position;

  const getPosition = () =>
    new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        position => res(position),
        e => rej(e),
        { enableHighAccuracy: true }
      );
    });

  onMount(async () => {
    try {
      position = await getPosition();
    } catch {
      return;
    }
    business = new Business(
      await $db
        .collection("approved_businesses")
        .doc(id)
        .get()
    );
  });
</script>

<Layout>
  {#if position}
    {#if business}
      <BusinessCard {business} />
      <Map {position} businesses={[business]} type="compact" />
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
