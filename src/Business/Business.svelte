<script>
  import { link } from "svelte-routing";
  import { loggedIn } from "../stores.js";

  const arrayToDays = array => {
    const days = [
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábados",
      "domingos"
    ];
    return array.map(i => days[i]);
  };

  const makeCommaSeparatedString = (arr, useOxfordComma) => {
    const listStart = arr.slice(0, -1).join(", ");
    const listEnd = arr.slice(-1);
    const conjunction =
      arr.length <= 1 ? "" : useOxfordComma && arr.length > 2 ? ", y " : " y ";

    return [listStart, listEnd].join(conjunction);
  };

  const getCategoryNameById = id => {
    const category = categories.docs.find(doc => doc.id === id);
    return category ? category.data().name : "";
  };

  const normalizePhone = phone => {
    let digits = phone.replace(/\D+/g, "");
    if (!digits.startsWith("54")) digits = `54${digits}`;
    return digits;
  };

  const whatsAppMessage =
    "¡Hola! Te encontré en Comprar Desde Casa (https://comprardesdecasa.com.ar), te quería solicitar información sobre tu negocio.";

  export let business;
  export let categories;
</script>

<style>
  .business {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
  }

  .business h1 {
    font-size: 1.15rem;
    margin: 0;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .business h1 a {
    font-weight: normal;
    text-decoration: none;
    font-size: 0.9rem;
    margin-left: 0.25rem;
  }

  .business h1 img {
    width: 2rem;
  }

  .business h2 {
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: normal;
    color: darkgray;
    margin: 0;
    margin-bottom: 1rem;
  }

  .business .buttons {
    display: flex;
    flex-direction: column;
  }

  .business .buttons a {
    color: #1e4cf5;
    text-decoration: none;
    margin: 0.25rem 0;
  }

  .business .buttons a i,
  .radius i {
    margin-right: 0.25rem;
    width: 1rem;
  }

  .radius {
    display: flex;
  }

  .radius i {
    margin-right: 1rem;
  }

  .description {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }
</style>

<article class="business">
  <h1>
    <span>
      {business.name || 'Nombre del negocio'}
      {#if $loggedIn}
        <a use:link href="/editar-negocio/{business.id}">
          <i class="fas fa-edit" />
          Editar
        </a>
      {/if}
    </span>
    <img src="/markers/{business.category}.png" alt />
  </h1>
  <h2>{getCategoryNameById(business.category)}</h2>
  <p class="radius">
    <i class="fas fa-biking" />
    Entrega los {makeCommaSeparatedString(arrayToDays(business.delivery_days)) || '<días>'}
    en un radio de {business.delivery_radius || '<radio>'} km
  </p>
  <p class="description">
    {business.description || 'Insertá una breve descripción del negocio..'}
  </p>
  <section class="buttons">
    {#if business.whatsapp}
      <a
        href="https://wa.me/{normalizePhone(business.phone)}?text={encodeURIComponent(whatsAppMessage)}"
        target="_blank">
        <i class="fab fa-whatsapp" />
        Hablar ahora
      </a>
    {/if}
    <a href="tel:{business.phone}" target="_blank">
      <i class="fas fa-phone" />
      Llamar ahora
    </a>
    {#if business.url}
      <a href={`${business.url}?ref=comprardesdecasa`} target="_blank">
        <i class="fas fa-link" />
        Ver sitio web
      </a>
    {/if}
  </section>
</article>
