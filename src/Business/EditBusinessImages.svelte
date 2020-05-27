<script>
  import { onMount, tick } from "svelte";

  export let business;

  import GLightbox from "glightbox";

  let images,
    loading = true,
    range = [...Array(3).keys()];

  const removeImage = image => async () =>
    (images = await business.removeImage(image));

  const onFileAdd = async ({ target: { files } }) =>
    (images = await business.addImageFromFile(files[0]));

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
    justify-content: flex-start;
    align-items: center;
    margin: 0 calc(-1 * var(--margin));
    height: 6rem;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 0;
    list-style: none;
  }

  .images .image {
    position: relative;
    object-fit: cover;
    width: calc(100% / 3 - var(--margin) * 2);
    height: 100%;
    margin: 0 var(--margin);
    border-radius: 7px;
    animation: loading-images 0.25s infinite alternate ease-in-out;
    box-sizing: border-box;
  }

  .images .image img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }

  @keyframes loading-images {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.3);
    }
  }

  .images .add-image {
    border: 1px dashed lightgray;
    animation: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .images .add-image :not(input) {
    pointer-events: none;
  }

  .images .add-image input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .remove {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(30%) translateY(-50%);
    background: red;
    border: 0;
    padding: 0;
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    color: white;
    z-index: 1;
    font-size: 0.6rem;
  }
</style>

<ul class="images">
  {#if images}
    {#each range as i}
      {#if images[i]}
        <li class="image">
          <img data-glightbox="type: image;" src={images[i].url} alt />
          <button
            type="button"
            class="remove"
            on:click|stopPropagation={removeImage(images[i])}>
            <i class="fas fa-times" />
          </button>
        </li>
      {:else}
        <li class="add-image image">
          <i class="fas fa-plus-circle" />
          Añadir
          <input
            type="file"
            accept="image/jpeg,image/jpg"
            on:change={onFileAdd} />
        </li>
      {/if}
    {/each}
  {:else if loading}
    {#each range as i}
      <li class="image" />
    {/each}
  {/if}
</ul>
