<script>
  import { link } from "svelte-routing";
  import { loggedIn } from "../stores.js";

  import Layout from "../Layout/Layout.svelte";
  import Info from "../Utility/Info.svelte";
  import EditBusinessForm from "./EditBusinessForm.svelte";

  export let db;
  export let geo;
  export let categories;
  export let id;

  let sent = false;

  const onFormSent = () => {
    sent = true;
  };
</script>

<style>
  h1 {
    margin-top: 0;
  }
</style>

<Layout>
  {#if $loggedIn}
    <h1>Editando negocio</h1>
    {#if sent}
      <Info type="success">Tu negocio fue editado correctamente.</Info>
    {:else}
      <EditBusinessForm {db} {geo} {categories} {id} on:sent={onFormSent} />
    {/if}
  {:else}
    <Info type="error">
      Debes iniciar sesión para editar un negocio.
      <a use:link href="/admin">Ir al panel de administrador</a>
    </Info>
  {/if}
</Layout>
