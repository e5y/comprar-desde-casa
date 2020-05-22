<script>
  import { appLoaded, session } from "../stores.js";
  import { link } from "svelte-routing";
</script>

<style>
  header {
    background: white;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
  }
  .logo {
    max-width: 150px;
    display: block;
    margin: auto;
    margin-top: 0.25rem;
    width: 80%;
  }
  .logo img {
    width: 100%;
  }

  .topbar {
    background: var(--primary);
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    text-align: center;
    color: white;
  }
  .topbar button {
    background: none;
    border: 0;
    color: white;
  }
  .topbar a,
  .topbar a:visited {
    text-decoration: none;
    color: white;
  }

  @media screen and (min-width: 800px) {
    .sticky .logo .logo-image {
      display: block;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo {
      margin: 1rem;
    }
  }
</style>

{#if $appLoaded && $session.isAdmin}
  <section class="topbar">
    <span>
      <i class="fas fa-cogs" />
      <a use:link href="/admin">Ir al panel de administración</a>
    </span>
    <button on:click={$session.logOut}>
      <i class="fas fa-sign-out-alt" />
      Salir
    </button>
  </section>
{/if}
<header>
  <section class="logo">
    <a use:link href="/">
      <img class="logo-image" alt src="/logo.png" loading="lazy" />
    </a>
  </section>
</header>
