<script>
  import { loggedIn } from "../stores.js";
  import { logOut } from "../utils.js";
  import { link } from "svelte-routing";

  import Sticky from "../Utility/Sticky.svelte";
</script>

<style>
  header {
    background: white;
    z-index: 99;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
  }

  header.sticky {
    display: flex;
    align-items: center;
    padding: 0.25rem 1rem;
  }

  .logo {
    max-width: 175px;
    display: block;
    margin: auto;
    margin-top: 0.25rem;
    width: 80%;
  }

  .sticky .logo {
    max-width: 40px;
    margin: 0;
  }

  .logo img {
    width: 100%;
  }

  .logo .icon-image {
    display: none;
  }

  .sticky .logo .icon-image {
    display: block;
  }

  .sticky .logo .logo-image {
    display: none;
  }

  nav {
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0.5rem auto;
    max-width: 1024px;
    font-size: 1rem;
  }

  nav a,
  nav a:visited {
    color: black;
    text-decoration: none;
    margin: 0 0.5rem;
  }

  .sticky nav a {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
  }

  nav a i {
    transform: scale(1);
    transition: 0.1s ease;
  }

  .sticky nav i {
    margin-bottom: 0.25rem;
  }

  nav a:active i,
  nav a:hover i,
  nav a:focus i {
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

  .topbar a,
  .topbar a:visited {
    text-decoration: none;
    color: black;
  }

  @media screen and (min-width: 800px) {
    header.sticky {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sticky .logo {
      max-width: 175px;
      margin: 1rem;
    }
    .sticky .logo .icon-image {
      display: none;
    }
    .sticky .logo .logo-image {
      display: block;
    }
    .sticky nav a {
      display: inline;
      margin: 0 0.75rem;
    }
    .sticky nav i {
      margin-bottom: 0;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    nav {
      justify-content: flex-start;
      margin: 0;
    }
    nav a {
      margin: 0 1rem;
    }
    .logo {
      margin: 1rem;
    }
  }
</style>

{#if $loggedIn}
  <section class="topbar">
    <span>
      <i class="fas fa-cogs" />
      <a use:link href="/admin">Ir al panel de administración</a>
    </span>
    <button on:click={logOut}>
      <i class="fas fa-sign-out-alt" />
      Salir
    </button>
  </section>
{/if}
<Sticky let:sticky>
  <header class:sticky>
    <section class="logo">
      <a use:link href="/">
        <img class="icon-image" alt src="/favicon.png" />
        <img class="logo-image" alt src="/logo.png" />
      </a>
    </section>
    <nav>
      <a use:link href="/">
        <i class="fas fa-home" />
        Inicio
      </a>
      <a use:link href="/cerca/todos">
        <i class="fas fa-map-marker-alt" />
        Cerca mío
      </a>
      <a use:link href="/agregar-negocio">
        <i class="fas fa-plus-circle" />
        Agregar
        {#if !sticky}negocio{/if}
      </a>
    </nav>
  </header>
</Sticky>
