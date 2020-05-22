<script>
  import { session } from "../stores.js";
  import WhatsAppButton from "./Buttons/WhatsAppButton.svelte";
  import PhoneButton from "./Buttons/PhoneButton.svelte";
  import WebsiteButton from "./Buttons/WebsiteButton.svelte";
  import ShareButton from "./Buttons/ShareButton.svelte";

  export let business;
</script>

<style>
  .business {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
  }

  header {
    display: flex;
    align-items: flex-start;
  }

  header img {
    width: 2rem;
    margin-left: auto;
  }

  header h1 {
    font-size: 1.15rem;
    margin: 0;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header h1 a {
    font-weight: normal;
    text-decoration: none;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }

  header h2 {
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: normal;
    color: darkgray;
    margin: 0;
    margin-bottom: 1rem;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }

  .delivery-info i {
    margin-right: 0.25rem;
    width: 1rem;
  }

  .delivery-info {
    display: flex;
  }

  .delivery-info i {
    margin-right: 1rem;
  }

  .description {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }

  .admin {
    padding: 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    list-style: none;
    word-break: break-all;
  }
</style>

<article class="business">
  <header>
    <div>
      <h1>
        {business.name}
        {#if $session.isAdmin()}
          <a href="/editar-negocio/{business.id}" style="min-width: 4rem;">
            <i class="fas fa-edit" />
            Editar
          </a>
        {/if}
      </h1>
      <h2>{business.category_hr}</h2>
    </div>
    <img src={business.marker} alt loading="lazy" />
  </header>
  {#if business.delivery_days && business.delivery_radius}
    <p class="delivery-info">
      <i class="fas fa-biking" />
      <span>
        Entrega los
        <b>{business.delivery_days_hr}</b>
        en un radio de
        <b>{business.delivery_radius_hr}</b>
      </span>
    </p>
  {/if}
  <p class="description">{business.description}</p>
  {#if $session.isAdmin()}
    {#await business.getOwner() then owner}
      <ul class="admin">
        <li>
          <b>Titular:</b>
          {owner.name}
        </li>
        <li>
          <b>Correo:</b>
          {owner.email}
        </li>
        <li>
          <b>Ubicación:</b>
          {business.location}
        </li>
        <li>
          <b>Teléfono:</b>
          {business.phone}
        </li>
        {#if business.url}
          <li>
            <b>Sitio web:</b>
            {business.url}
          </li>
        {/if}
      </ul>
    {/await}
  {/if}
  {#if !window.location.pathname.includes('/admin')}
    <section class="buttons">
      {#if business.whatsapp}
        <WhatsAppButton phone={business.phone} />
      {/if}
      <PhoneButton phone={business.phone} />
      {#if business.url}
        <WebsiteButton url={business.url} />
      {/if}
      <ShareButton {business} />
    </section>
  {/if}
</article>
