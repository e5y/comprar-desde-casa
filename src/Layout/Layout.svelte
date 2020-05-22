<script>
  import { loaded } from "../stores.js";

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import Loader from "../Utility/Loader.svelte";
</script>

<style>
  .content {
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  @media screen and (min-width: 1024px) {
    .content {
      padding: 2rem 1rem;
    }
  }
</style>

<Header />
<section class="content">
  {#if $loaded}
    <slot />
  {:else}
    <Loader />
  {/if}
</section>
<Footer />
