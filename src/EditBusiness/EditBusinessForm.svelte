<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { navigate } from "svelte-routing";

  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";

  import { googleMapsLoaded } from "../stores.js";

  export let db;
  export let geo;
  export let categories;
  export let id;

  let doc, form;

  const setupInput = () => {
    const input = document.querySelector("input[name=location]");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      form.position = geo.point(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
  };

  onMount(async () => {
    doc = await db
      .collection("approved_businesses")
      .doc(id)
      .get();

    if (doc.exists) {
      form = { ...doc.data() };
      setTimeout(setupInput, 1);
    }
  });

  const dispatch = createEventDispatcher();

  const sendForm = async () => {
    db.collection("approved_businesses")
      .doc(id)
      .set(form);
    dispatch("sent");
  };

  const deleteBusiness = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés borrar el negocio?"
    );
    if (confirmed) {
      db.collection("approved_businesses")
        .doc(id)
        .delete();
      navigate("/");
    }
  };
</script>

{#if doc}
  {#if doc.exists}
    <style>
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

      input[type="submit"] {
        background: black;
        color: white;
      }

      .delete-business {
        background: red;
        color: white;
        width: 100%;
        border-radius: 7px;
        border: 0;
        font-size: 1rem;
        font-family: Roboto;
        padding: 1rem;
      }

      .field-description {
        font-size: 0.9rem;
        color: rgba(0, 0, 0, 0.7);
        margin: 0;
      }
    </style>
    <form on:submit|preventDefault={sendForm}>
      <section class="form-section">
        <input
          type="text"
          name="owner_name"
          placeholder="Nombre del titular *"
          required
          maxlength="50"
          bind:value={form.owner_name} />
        <input
          type="email"
          name="owner_email"
          required
          placeholder="Correo electrónico *"
          bind:value={form.owner_email} />
        <p class="field-description">
          Ni tu nombre ni tu correo serán visibles
        </p>
      </section>
      <section class="form-section">
        <input
          type="text"
          name="name"
          placeholder="Nombre del negocio *"
          required
          maxlength="50"
          bind:value={form.name} />
        <input
          type="text"
          name="location"
          placeholder="Ubicación *"
          bind:value={form.location} />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono *"
          required
          maxlength="50"
          bind:value={form.phone} />
        <label>
          <input type="checkbox" name="whatsapp" bind:checked={form.whatsapp} />
          ¿Se atiende por WhatsApp?
        </label>
      </section>
      <section class="form-section">
        <label for="category">Categoría *</label>
        <select id="category" bind:value={form.category} required>
          {#each categories.docs.sort((a, b) =>
            a.data().name.localeCompare(b.data().name)
          ) as category}
            <option value={category.id}>{category.data().name}</option>
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
              bind:group={form.delivery_days}
              value="0" />
            L
          </label>
          <label>
            <input
              type="checkbox"
              name="delivery_days"
              bind:group={form.delivery_days}
              value="1" />
            M
          </label>
          <label>
            <input
              type="checkbox"
              name="delivery_days"
              bind:group={form.delivery_days}
              value="2" />
            Mi
          </label>
          <label>
            <input
              type="checkbox"
              name="delivery_days"
              bind:group={form.delivery_days}
              value="3" />
            J
          </label>
          <label>
            <input
              type="checkbox"
              name="delivery_days"
              bind:group={form.delivery_days}
              value="4" />
            V
          </label>
          <label>
            <input
              type="checkbox"
              name="delivery_days"
              bind:group={form.delivery_days}
              value="5" />
            S
          </label>
          <label>
            <input
              type="checkbox"
              name="delivery_days"
              bind:group={form.delivery_days}
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
          bind:value={form.delivery_radius} />
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
          bind:value={form.description} />
        <input
          type="url"
          name="url"
          placeholder="Tienda online o sitio web"
          bind:value={form.url} />
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
      <button type="button" class="delete-business" on:click={deleteBusiness}>
        Borrar negocio
      </button>
      <input type="submit" value="Editar negocio" />
    </form>
  {:else}
    <Info type="error">No hay ningún documento con ese ID</Info>
  {/if}
{:else}
  <Loader />
{/if}
