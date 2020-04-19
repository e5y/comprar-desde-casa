<script>
  import BusinessCategory from "./BusinessCategory.svelte";
  import AddBusinessButton from "../Business/AddbusinessButton.svelte";

  export let categories;
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: -0.5rem;
  }
</style>

<ul class="business-categories">
  {#each $categories as category}
    <BusinessCategory {category} />
  {/each}
  <AddBusinessButton />
</ul>
