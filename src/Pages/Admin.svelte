<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

  import { db, session, categories } from "../stores.js";

  import Layout from "../Layout/Layout.svelte";
  import Info from "../Utility/Info.svelte";
  import Heading from "../Utility/Heading.svelte";

  import AdminBusinessList from "../Admin/AdminBusinessList.svelte";

  let pending, approved, rejected;

  const onListLoad = e => {
    const collection = e.detail.collection;
    const businesses = e.detail.businesses;
    switch (collection) {
      case "pending_businesses":
        pending = businesses;
        break;
      case "approved_businesses":
        approved = businesses;
        break;
      case "rejected_businesses":
        rejected = businesses;
        break;
    }
  };

  let loading = true;

  const logOut = async () => {
    $session.logOut();
    await firebase.auth().signOut();
    initFirebaseUI(true);
  };

  onMount(() => {
    if (!$session.isLoggedIn || !$session.isAdmin)
      navigate("/iniciar-sesion", { replace: true });
  });
</script>

<style>
  :global(.svelte-tabs .svelte-tabs__tab) {
    font-size: 0.9rem;
  }
  .logout-button {
    background: none;
    color: #4f81e5;
    font-size: 1rem;
    border: 0;
  }
</style>

<Heading>
  Administrador
  {#if $session.isLoggedIn}
    <button class="logout-button" on:click={logOut}>
      <i class="fas fa-sign-out-alt" />
      Salir
    </button>
  {/if}
</Heading>
{#if $session.isLoggedIn}
  <Info id="admin-query-limit-notice" rest="1d">
    Cada pestaña muestra un máximo de 10 resultados en orden de creación (los
    primeros en registrarse aparecen primero). Esto será así hasta implementar
    el paginado.
  </Info>
  <Tabs>
    <TabList>
      <Tab>
        <i class="fas fa-clock" />
        Pendientes
      </Tab>
      <Tab>
        <i class="fas fa-check" />
        Aprobados
      </Tab>
      <Tab>
        <i class="fas fa-times" />
        Rechazados
      </Tab>
    </TabList>

    <TabPanel>
      <AdminBusinessList
        collection="pending_businesses"
        businesses={pending}
        on:load={onListLoad} />
    </TabPanel>

    <TabPanel>
      <AdminBusinessList
        collection="approved_businesses"
        businesses={approved}
        on:load={onListLoad} />
    </TabPanel>

    <TabPanel>
      <AdminBusinessList
        collection="rejected_businesses"
        businesses={rejected}
        on:load={onListLoad} />
    </TabPanel>
  </Tabs>
{:else}
  <div id="firebaseui-auth-container" />
{/if}
