<script>
  import { loggedIn, categories, db } from "../stores.js";

  import { Business } from "../classes/Business.js";

  import Layout from "../Layout/Layout.svelte";
  import BusinessForm from "./BusinessForm.svelte";
  import BusinessCard from "./BusinessCard.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Heading from "../Utility/Heading.svelte";

  let business = new Business();
  let sent = false;

  const addBusiness = () => {
    const collection = $loggedIn ? "approved_businesses" : "pending_businesses";
    // TODO: Add try catch
    $db
      .collection(collection)
      .doc(business.id)
      .set(business.export);
    sent = true;
  };
</script>

<Layout>
  <Heading>Agregá tu negocio</Heading>
  <Info id="agrega-tu-negocio" rest="1d">
    Si tenés un negocio y hacés delivery, podés inscribirte para aparecer en los
    listados de Comprá desde Casa
  </Info>
  {#if $loggedIn}
    <Info type="warning">
      Estás logueado como administrador, al enviar el formulario el negocio se
      aprobará de manera instantánea
    </Info>
  {/if}
  {#if $categories}
    {#if sent}
      <Info type="success">
        Tu negocio fue enviado y está en revisión, te enviaremos un correo
        cuando sea aprobado.
      </Info>
    {:else}
      <BusinessForm
        bind:business
        on:submit={addBusiness}
        submitText="Inscribirse" />
      <BusinessCard {business} />
    {/if}
  {:else}
    <Loader />
  {/if}
</Layout>
