<script>
  import Layout from "./Layout.svelte";
  import Info from "./Info.svelte";
  import Loader from "./Loader.svelte";
  import AddBusinessForm from "./AddBusinessForm.svelte";

  let sent = false;
  const onFormSent = () => {
    sent = true;
  };

  export let db;
  export let geo;
  export let categories;
</script>

<style>
  h1 {
    margin-top: 0;
  }
</style>

<Layout>
  <h1>Agregá tu negocio</h1>
  <Info>
    Si tenés un negocio y hacés delivery, podés inscribirte para aparecer en los
    listados de Comprá desde Casa
  </Info>
  {#if categories}
    {#if sent}
      <Info type="success">
        Tu negocio fue enviado y está en revisión, te enviaremos un correo
        cuando sea aprobado.
      </Info>
    {:else}
      <AddBusinessForm {db} {geo} {categories} on:sent={onFormSent} />
    {/if}
  {:else}
    <Loader />
  {/if}
</Layout>
