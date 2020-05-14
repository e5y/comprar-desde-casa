<script>
  import { user, categories, db } from "../stores.js";

  import { Business } from "../classes/Business.js";
  import { Owner } from "../classes/Owner.js";

  import Layout from "../Layout/Layout.svelte";
  import BusinessForm from "./BusinessForm.svelte";
  import BusinessCard from "./BusinessCard.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";
  import Heading from "../Utility/Heading.svelte";

  let business = new Business();
  let owner = new Owner();
  let sent = false;

  const addBusiness = async () => {
    const collection = $user.isAdmin()
      ? "approved_businesses"
      : "pending_businesses";
    try {
      await $user.register(owner.email, owner.password, {
        displayName: owner.name
      });
      business.owner_id = $user.details.uid;
      await $db
        .collection("owners")
        .doc(business.owner_id)
        .set(owner.export);
      await $db
        .collection(collection)
        .doc(business.id)
        .set(business.export);
      sent = true;
    } catch (e) {
      //TODO: Handle errors better
      console.error(e);
    }
  };
</script>

<Layout>
  <Heading>Agregá tu negocio</Heading>
  <Info id="agrega-tu-negocio" rest="1d">
    Si tenés un negocio y hacés delivery, podés inscribirte para aparecer en los
    listados de Comprá desde Casa
  </Info>
  {#if $user.isAdmin()}
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
        bind:owner
        on:submit={addBusiness}
        submitText="Inscribirse" />
      <BusinessCard {business} />
    {/if}
  {:else}
    <Loader />
  {/if}
</Layout>
