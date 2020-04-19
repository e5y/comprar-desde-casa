<script>
  export let business;

  const text = `${business.name} (${business.category_hr}) en Comprá desde Casa`;

  const waText = `${text} (${business.permalink})`;
  const waURL = `https://wa.me/?text=${encodeURIComponent(waText)}`;

  const share = () => {
    navigator.share({
      title: business.name,
      text,
      url: business.permalink
    });
  };
</script>

<style>
  button,
  a {
    text-decoration: none;
    margin: 0.15rem 0;
    background: #1e4cf5;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    text-align: center;
    border: 0;
    font-size: inherit;
    font-family: inherit;
  }

  button i,
  a i {
    margin-right: 0.25rem;
    width: 1rem;
  }
</style>

{#if navigator.share}
  <button target="_blank" on:click={share}>
    <i class="fas fa-share-alt" />
    Compartir
  </button>
{:else}
  <a href={waURL} target="_blank">
    <i class="fas fa-share-alt" />
    Compartir
  </a>
{/if}
