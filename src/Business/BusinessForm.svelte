<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { categories, geo, googleMapsLoaded } from "../stores.js";

  export let business;
  export let submitText = "Enviar";

  const dispatch = createEventDispatcher();

  const sortedCategories = [...$categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const submitBusiness = () => dispatch("submit");

  const setupInput = () => {
    const input = document.querySelector("input[name=location]");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      business.position = $geo.point(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      business.location = place.name;
    });
  };

  onMount(() => {
    if ($googleMapsLoaded) setupInput();
  });
</script>

<style>
  form {
    margin-bottom: 1rem;
  }

  .form-section {
    margin: 1.5rem 0;
  }

  input,
  select,
  textarea {
    font-family: Roboto;
    padding: 1rem;
    border: 2px solid black;
    border-radius: 7px;
    margin: 0.25rem 0;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input[type="checkbox"] {
    width: auto;
    margin-right: 0.25rem;
  }

  label {
    display: block;
    margin: 0.5rem;
  }

  .days {
    display: flex;
    margin-bottom: 0.5rem;
    max-width: 300px;
  }

  .days label {
    flex: 1;
    display: flex;
    margin: 0;
    justify-content: flex-start;
    align-items: center;
  }

  .days label input {
    width: auto;
    margin-right: 0.25rem;
  }

  .field-description {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.7);
    margin: 0;
  }

  input[type="submit"] {
    background: black;
    color: white;
  }

  input[type="submit"]:disabled {
    background: #9e9e9e;
    border-color: #9e9e9e;
    color: white;
  }
</style>

{#if business}
  <form on:submit|preventDefault={submitBusiness}>
    <section class="form-section">
      <input
        type="text"
        name="owner_name"
        placeholder="Nombre del titular *"
        required
        maxlength="50"
        bind:value={business.owner_name} />
      <input
        type="email"
        name="owner_email"
        required
        placeholder="Correo electrónico *"
        bind:value={business.owner_email} />
      <p class="field-description">Ni tu nombre ni tu correo serán visibles</p>
    </section>
    <section class="form-section">
      <input
        type="text"
        name="name"
        placeholder="Nombre del negocio *"
        required
        maxlength="50"
        bind:value={business.name} />
      <input
        type="text"
        name="location"
        placeholder="Ubicación *"
        bind:value={business.location} />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono *"
        required
        maxlength="50"
        bind:value={business.phone} />
      <label>
        <input
          type="checkbox"
          name="whatsapp"
          bind:checked={business.whatsapp} />
        ¿Se atiende por WhatsApp?
      </label>
    </section>
    <section class="form-section">
      <label for="category">Categoría *</label>
      <select id="category" bind:value={business.category} required>
        {#each sortedCategories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
    </section>
    <section class="form-section">
      <label>Días de delivery</label>
      <section class="days">
        <label>
          <input
            type="checkbox"
            name="delivery_days"
            bind:group={business.delivery_days}
            value="0" />
          L
        </label>
        <label>
          <input
            type="checkbox"
            name="delivery_days"
            bind:group={business.delivery_days}
            value="1" />
          M
        </label>
        <label>
          <input
            type="checkbox"
            name="delivery_days"
            bind:group={business.delivery_days}
            value="2" />
          Mi
        </label>
        <label>
          <input
            type="checkbox"
            name="delivery_days"
            bind:group={business.delivery_days}
            value="3" />
          J
        </label>
        <label>
          <input
            type="checkbox"
            name="delivery_days"
            bind:group={business.delivery_days}
            value="4" />
          V
        </label>
        <label>
          <input
            type="checkbox"
            name="delivery_days"
            bind:group={business.delivery_days}
            value="5" />
          S
        </label>
        <label>
          <input
            type="checkbox"
            name="delivery_days"
            bind:group={business.delivery_days}
            value="6" />
          D
        </label>
      </section>
      <p class="field-description" style="margin-bottom: 1rem;">
        Tildá los días en los que repartís los pedidos
      </p>

      <input
        type="number"
        placeholder="Radio de entrega (km) *"
        name="delivery_radius"
        required
        max="100"
        bind:value={business.delivery_radius} />
      <p class="field-description">
        El radio de entrega en kilómetros desde tu local
      </p>

    </section>
    <section class="form-section">
      <textarea
        name="description"
        placeholder="Breve descripción del negocio"
        required
        maxlength="300"
        rows="8"
        bind:value={business.description} />
      <input
        type="url"
        name="url"
        placeholder="Tienda online o sitio web"
        bind:value={business.url} />
      <p class="field-description">
        Un enlace a su sitio web o perfil de redes sociales.
      </p>
      <p class="field-description" style="font-size:.7rem">
        Ej.
        <a
          target="_blank"
          href="https://grupoeon.com.ar"
          style="display:inline-flex;">
          <b>https://</b>
          grupoeon.com.ar
        </a>
        ó
        <a
          target="_blank"
          href="https://instagram.com/grupo.eon"
          style="display:inline-flex;">
          <b>https://</b>
          instagram.com/grupo.eon
        </a>
      </p>
    </section>
    <input type="submit" value={submitText} />
  </form>
{/if}
