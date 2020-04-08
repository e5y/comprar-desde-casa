<script>
  import { onMount } from "svelte";
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
  <Info>
    Podés seleccionar una categoría o bien buscar
    <Link to="/cerca/todos">todos los negocios cerca tuyo</Link>
  </Info>
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
