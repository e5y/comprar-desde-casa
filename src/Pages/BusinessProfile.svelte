<script>
  import { onMount } from "svelte";

  import { db } from "../stores.js";

  import { getPosition } from "../utilities.js";
  import { Business } from "../classes/Business.js";

  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";

  import BusinessCard from "../Business/BusinessCard.svelte";
  import Map from "../NearMe/Map.svelte";

  export let id;

  let position, business;

  onMount(async () => {
    try {
      position = await getPosition();
    } catch {
      position = false;
      return;
    }
    business = await $db.getApprovedBusiness(id);
  });
</script>

{#if position}
  {#if business}
    <BusinessCard {business} />
    <Map {position} businesses={[business]} type="compact" />
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
