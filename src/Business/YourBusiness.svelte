<script>
  import { onMount } from "svelte";
  import { link, navigate } from "svelte-routing";

  import { db, user } from "../stores.js";

  import { Businesses } from "../classes/Businesses";

  import Layout from "../Layout/Layout.svelte";
  import Heading from "../Utility/Heading.svelte";
  import Info from "../Utility/Info.svelte";
  import Loader from "../Utility/Loader.svelte";

  let hasPendingBusinesses = false,
    loading = true;

  user.subscribe(async user => {
    if (user.loggedIn) {
      const approvedBusinesses = new Businesses(
        await $db
          .collection("approved_businesses")
          .where("owner_id", "==", user.details.uid)
          .get()
      );
      const pendingBusinesses = new Businesses(
        await $db
          .collection("pending_businesses")
          .where("owner_id", "==", user.details.uid)
          .get()
      );
      if (approvedBusinesses.length) {
        navigate(`/editar-negocio/${approvedBusinesses[0].id}`, {
          replace: true
        });
      } else if (pendingBusinesses.length) {
        hasPendingBusinesses = true;
      }
    }
    loading = false;
  });

  const onLogoutClick = () => {
    $user.logOut();
    hasPendingBusinesses = false;
  };
</script>

<style>
  h2 {
    font-size: 1.15rem;
    font-weight: 500;
    text-align: center;
  }

  p {
    text-align: center;
  }
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: orange;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    color: white;
    text-decoration: none;
    font-family: inherit;
    font-weight: 500;
    font-size: inherit;
    margin: 0.5rem 0;
    border: 0;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  .button i {
    margin-right: 0.5rem;
  }

  .center {
    text-align: center;
  }

  section {
    margin-bottom: 2rem;
  }

  section:last-child {
    margin-bottom: 0;
  }
</style>

<Layout>
  <Heading>Tu negocio</Heading>
  {#if loading}
    <Loader />
  {:else if hasPendingBusinesses}
    <Info type="warning">
      Tenés un negocio pendiente de aprobación, te avisaremos cuando esté listo.
    </Info>
    <div class="center">
      <button class="button" on:click={onLogoutClick}>Cerrar sesión</button>
    </div>
  {:else}
    <section>
      <h2>Registrate ahora</h2>
      <p>
        Si tenés un negocio que hace envíos, sumalo sin ningún costo ni comisión
        por venta.
      </p>
      <div class="center">
        <a href="/agregar-negocio" use:link class="button">
          <i class="fas fa-plus-circle" />
          Agregar mi negocio
        </a>
      </div>
    </section>
    <section>
      <h2>¿Ya estás registrado?</h2>
      <p>
        Si ya estás registrado, iniciá sesión para modificar los datos de tu
        negocio.
      </p>
      <div class="center">
        <a href="/iniciar-sesion" use:link class="button">
          <i class="fas fa-sign-in-alt" />
          Iniciar sesión
        </a>
      </div>
    </section>
  {/if}
</Layout>
