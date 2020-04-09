<script>
  import { Link } from "svelte-routing";
</script>

<style>
  li {
    position: relative;
    width: calc(50% - 0.25rem);
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    border-radius: 10px;
    min-height: 100px;
    background-size: cover;
    margin-bottom: 0.5rem;
    color: white;
    font-weight: 500;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.25rem;
    text-align: center;
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

  :global(li a),
  :global(.add-business-button a) {
    color: white;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    font-size: 1rem;
  }
  :global(li a i) {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
</style>

<li class="add-business-button">
  <Link to="/agregar-negocio">
    <i class="fas fa-plus-circle" />
    Agregá tu negocio
  </Link>
</li>
