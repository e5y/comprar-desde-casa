<script>
  import { Link } from "svelte-routing";

  import { categories, eventPWA } from "../stores.js";

  import Layout from "../Layout/Layout.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";

  import BusinessCategories from "./BusinessCategories.svelte";
</script>

<Layout>
  <Info id="quedate-en-casa" type="primary" rest="1d">
    Quedate en tu casa y encontrá acá todos los negocios con delivery cerca tuyo
  </Info>
  <Info id="si-tenes-un-negocio" type="primary" icon="fas fa-store" rest="1d">
    Si tenés un negocio que hace envíos, sumalo sin ningún costo ni comisión por
    venta
  </Info>
  <h1>¿Qué buscás?</h1>
  {#if $categories}
    <BusinessCategories {categories} />
    {#if eventPWA}
      <Info icon="fas fa-mobile-alt">
        Agreganos a tu inicio y usá el sitio como cualquier otra app de
        Android/iOS.
        <a href="#">Agregar al inicio</a>
      </Info>
    {/if}
  {:else}
    <Loader />
  {/if}
</Layout>
