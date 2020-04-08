<script>
  import Layout from "./Layout.svelte";
  import Info from "./Info.svelte";

  export let db;
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
      <input type="text" name="name" placeholder="Nombre del titular *" />
      <input type="text" name="name" placeholder="Correo electrónico *" />
    </section>
    <section class="form-section">
      <input type="text" name="name" placeholder="Nombre del negocio *" />
      <input type="text" name="name" placeholder="Ubicación *" />
      <input type="text" name="name" placeholder="Teléfono *" />
      <label>
        <input type="checkbox" name="name" />
        ¿Se atiende por WhatsApp?
      </label>
    </section>
    <section class="form-section">
      <label for="categories">Categoría *</label>
      <select id="categories">
        <option>Verdulería</option>
        <option>Carnicería</option>
        <option>Congelado</option>
        <option>Almacén</option>
        <option>Farmacia</option>
        <option>Elaborados</option>
        <option>Ferretería</option>
        <option>Bebidas</option>
        <option>Electrónica</option>
        <option>Otro</option>
      </select>
    </section>
    <section class="form-section">
      <label>Días de delivery</label>
      <section class="days">
        <label>
          <input type="checkbox" name="name" />
          L
        </label>
        <label>
          <input type="checkbox" name="name" />
          M
        </label>
        <label>
          <input type="checkbox" name="name" />
          Mi
        </label>
        <label>
          <input type="checkbox" name="name" />
          J
        </label>
        <label>
          <input type="checkbox" name="name" />
          V
        </label>
        <label>
          <input type="checkbox" name="name" />
          S
        </label>
        <label>
          <input type="checkbox" name="name" />
          D
        </label>
      </section>
      <input type="number" placeholder="Radio de entrega (km)" />
    </section>
    <section class="form-section">
      <textarea
        name="name"
        placeholder="Breve descripción del negocio"
        maxlength="300"
        rows="8" />
      <input type="text" name="name" placeholder="Tienda online o sitio web" />
    </section>
    <input type="submit" value="Inscribirme" />
  </form>
</Layout>
