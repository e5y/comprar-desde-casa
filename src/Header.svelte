<script>
  import { Link } from "svelte-routing";
  import { loggedIn } from "./stores.js";
  import { logOut } from "./utils.js";
</script>

<style>
  header {
    background: white;
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  .logo {
    max-width: 200px;
    display: block;
    margin: auto;
    margin-top: 1rem;
    width: 80%;
  }
  .logo img {
    width: 100%;
  }
  nav {
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin: 1rem;
  }
  :global(nav a),
  :global(nav a:visited) {
    color: black;
    text-decoration: none;
  }

  :global(nav a i) {
    transform: scale(1);
    transition: 0.1s ease;
  }

  :global(nav a:active i),
  :global(nav a:hover i),
  :global(nav a:focus i) {
    transform: scale(1.1);
  }

  .topbar {
    background: #ff9595;
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  .topbar button {
    background: none;
    text-decoration: underline;
    border: 0;
  }

  :global(.topbar a),
  :global(.topbar a:visited) {
    text-decoration: none;
    color: black;
  }
</style>

<header>
  {#if $loggedIn}
    <section class="topbar">
      <span>
        <i class="fas fa-cogs" />
        <Link to="/admin">Ir al panel de administración</Link>
      </span>
      <button on:click={logOut}>
        <i class="fas fa-sign-out-alt" />
        Salir
      </button>
    </section>
  {/if}
  <section class="logo">
    <Link to="/">
      <img alt src="/logo.png" />
    </Link>
  </section>
  <nav>
    <Link to="/">
      <i class="fas fa-home" />
      Inicio
    </Link>
    <Link to="/cerca/todos">
      <i class="fas fa-map-marker-alt" />
      Cerca mío
    </Link>
    <Link to="/agregar-negocio">
      <i class="fas fa-plus-circle" />
      Agregar negocio
    </Link>
  </nav>
</header>
