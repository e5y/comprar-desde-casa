<script>
  import { eventPWA } from "../stores.js";
  const installPWA = () => {
    $eventPWA.prompt();
  };
</script>

<style>
  footer {
    color: black;
    text-align: center;
    margin-top: auto;
    padding: 2rem;
    font-size: 0.9rem;
  }

  .authors {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  .authors a {
    margin: 0 0.75rem;
  }
  .authors a img {
    max-height: 2.5rem;
  }

  .social-media {
    margin-top: 2rem;
    font-size: 1rem;
  }

  .social-media a {
    text-decoration: none;
  }

  .pwa {
    margin-top: 1rem;
  }

  .pwa button {
    background: none;
    border: 0;
    font-family: Roboto;
    font-size: 1rem;
  }
</style>

<footer>
  <section>Un aporte de</section>
  <section class="authors">
    <a href="https://grupoeon.com.ar?ref=comprardesdecasa" target="_blank">
      <img alt="Grupo EON" src="/authors/grupoeon.png" loading="lazy" />
    </a>
    <a
      href="https://www.instagram.com/multiphone_cba?ref=comprardesdecasa"
      target="_blank">
      <img
        alt="MultiPhone"
        src="/authors/multiphone.png"
        style="max-height: 3.5rem;"
        loading="lazy" />
    </a>
  </section>
  <section class="social-media">
    <i class="fab fa-instagram" />
    <a href="https://www.instagram.com/comprardesdecasa/" target="_blank">
      comprardesdecasa
    </a>
  </section>
  {#if eventPWA}
    <section class="pwa">
      <button on:click={installPWA}>
        <i class="fas fa-mobile-alt" style="margin-right: .25rem;" />
        Agregar al Inicio
      </button>
    </section>
  {/if}
</footer>
