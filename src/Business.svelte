<script>
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

  export let business;
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
  <h1>{business.name}</h1>
  <h2>{business.category}</h2>
  <p class="radius">
    <i class="fas fa-biking" />
    Entrega los {makeCommaSeparatedString(arrayToDays(business.delivery_days))}
    en un radio de {business.delivery_radius} km
  </p>
  <p class="description">{business.description}</p>
  <section class="buttons">
    {#if business.whatsapp}
      <a href="https://wa.me/{business.phone.replace(/\D+/g, '')}">
        <i class="fab fa-whatsapp" />
        Hablar ahora
      </a>
    {/if}
    <a href="tel:{business.phone}">
      <i class="fas fa-phone" />
      Llamar ahora
    </a>
    <a href={business.url}>
      <i class="fas fa-link" />
      {business.url.replace(/(^\w+:|^)\/\//, '')}
    </a>
  </section>
</article>
