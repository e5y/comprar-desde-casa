<script>
  import { Link } from "svelte-routing";
  import Layout from "./Layout.svelte";
  import BusinessCategories from "./BusinessCategories.svelte";
  import BusinessCategory from "./BusinessCategory.svelte";
  import AddBusinessButton from "./AddBusinessButton.svelte";
  import Loader from "./Loader.svelte";
  import Info from "./Info.svelte";

  export let categories;
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
  {#if categories}
    <BusinessCategories>
      {#each categories.docs as category}
        <BusinessCategory {category} />
      {/each}
      <AddBusinessButton />
    </BusinessCategories>
  {:else}
    <Loader />
  {/if}
</Layout>
