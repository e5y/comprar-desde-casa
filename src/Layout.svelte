<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<style>
  .content {
    padding: 1rem;
  }
</style>

<Header />
<section class="content">
  <slot />
</section>
<Footer />
