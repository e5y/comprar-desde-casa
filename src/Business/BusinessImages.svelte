<script>
  import { onMount, tick } from "svelte";

  export let business;

  import GLightbox from "glightbox";

  let images,
    loading = true;

  onMount(async () => {
    try {
      images = await business.getImages();
      await tick();
      const lightbox = GLightbox({
        selector: "[data-glightbox]",
        touchNavigation: true,
        loop: true
      });
    } catch (e) {
      // TODO: Handle errors better 😢
      console.error("❌ Could not retrieve Business images", e);
    }
    loading = false;
  });
</script>

<style>
  .images:not(:empty) {
    --margin: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 calc(-1 * var(--margin));
    height: 6rem;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .images .image {
    object-fit: cover;
    width: calc(100% / 3 - var(--margin) * 2);
    height: 100%;
    margin: 0 var(--margin);
    border-radius: 7px;
    animation: loading-images 0.25s infinite alternate ease-in-out;
  }

  @keyframes loading-images {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.3);
    }
  }
</style>

<section class="images">
  {#if images}
    {#each images as image}
      <img data-glightbox="type: image;" class="image" src={image.url} alt />
    {/each}
  {:else if loading}
    <div class="image" />
    <div class="image" />
    <div class="image" />
  {/if}
</section>
