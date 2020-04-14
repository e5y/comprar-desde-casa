<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
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
  <slot />
</section>
<Footer />
