<script>
  import { Link } from "svelte-routing";
  export let category;
</script>

<style>
  li {
    position: relative;
    width: calc(50% - 0.25rem);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    background-blend-mode: multiply;
    min-height: 100px;
    background-size: cover;
    margin-bottom: 0.5rem;
    color: white;
    font-weight: 500;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .business-category :global(a) {
    font-size: 1.25rem;
    color: white;
    text-decoration: none;
    padding: 0 1rem;
  }

  @media screen and (min-width: 700px) {
    li {
      width: calc(33% - 0.25rem);
    }
  }

  @media screen and (min-width: 1000px) {
    li {
      width: calc(25% - 0.25rem);
    }
  }
</style>

<li
  class="business-category"
  style="background-image:url({category.data().img})">
  <Link to="/cerca/{category.id}">{category.data().name}</Link>
</li>
