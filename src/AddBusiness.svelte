<script>
  import Layout from "./Layout.svelte";
  import Info from "./Info.svelte";
  import { onMount } from "svelte";
  import { googleMapsLoaded } from "./stores";

  const form = {
    owner_name: "",
    owner_email: "",
    name: "",
    position: null,
    location: "",
    phone: "",
    whatsapp: false,
    category: "",
    delivery_days: [],
    delivery_radius: "",
    description: "",
    url: ""
  };

  const setupInput = () => {
    const input = document.querySelector("input[name=location]");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      form.position = geo.point(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      form.location = place.name;
    });
  };

  const sendForm = () => {
    db.collection("businesses").add(form);
  };

  onMount(() => {
    googleMapsLoaded.subscribe(loaded => loaded === true && setupInput());
  });

  export let db;
  export let geo;
</script>

<style>
  h1 {
    margin-top: 0;
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
  }

  .days label {
    flex: 1;
    display: flex;
    margin: 0;
    justify-content: center;
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
</style>

<Layout>
  <h1>Agregá tu negocio</h1>
  <Info>
    Si tenés un negocio y hacés delivery, podés inscribirte para aparecer en los
    listados de Comprá desde Casa
  </Info>
  <form>
    <section class="form-section">
      <input
        type="text"
        name="owner_name"
        placeholder="Nombre del titular *"
        bind:value={form.owner_name} />
      <input
        type="email"
        name="owner_email"
        placeholder="Correo electrónico *"
        bind:value={form.owner_email} />
    </section>
    <section class="form-section">
      <input
        type="text"
        name="name"
        placeholder="Nombre del negocio *"
        bind:value={form.name} />
      <input type="text" name="location" placeholder="Ubicación *" />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono *"
        bind:value={form.phone} />
      <label>
        <input type="checkbox" name="whatsapp" bind:checked={form.whatsapp} />
        ¿Se atiende por WhatsApp?
      </label>
    </section>
    <section class="form-section">
      <label for="category">Categoría *</label>
      <select id="category" bind:value={form.category}>
        <option value="verdulerias">Verdulería</option>
        <option value="carnicerias">Carnicería</option>
        <option value="congelados">Congelado</option>
        <option value="almacenes">Almacén</option>
        <option value="farmacias">Farmacia</option>
        <option value="elaborados">Elaborados</option>
        <option value="ferreterias">Ferretería</option>
        <option value="bebidas">Bebidas</option>
        <option value="electronica">Electrónica</option>
        <option value="otros">Otros</option>
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
      <input
        type="number"
        placeholder="Radio de entrega (km)"
        name="delivery_radius"
        bind:value={form.delivery_radius} />
    </section>
    <section class="form-section">
      <textarea
        name="description"
        placeholder="Breve descripción del negocio"
        maxlength="300"
        rows="8"
        bind:value={form.description} />
      <input
        type="url"
        name="url"
        placeholder="Tienda online o sitio web"
        bind:value={form.url} />
    </section>
    <input
      type="submit"
      value="Inscribirme"
      on:click|once|preventDefault={sendForm} />
  </form>
</Layout>
