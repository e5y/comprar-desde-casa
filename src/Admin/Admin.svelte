<script>
  import { onMount } from "svelte";
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

  import { loggedIn, db, categories } from "../stores.js";

  import Layout from "../Layout/Layout.svelte";
  import Info from "../Utility/Info.svelte";
  import Heading from "../Utility/Heading.svelte";

  import AdminBusinessList from "./AdminBusinessList.svelte";

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
    loggedIn.set(false);
    await firebase.auth().signOut();
    initFirebaseUI(true);
  };

  const initFirebaseUI = force => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return false;
        },
        uiShown: function() {
          loading = false;
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: "popup",
      signInSuccessUrl: "/admin",
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    };
    if (!$loggedIn) {
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  };

  onMount(initFirebaseUI);
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

<Layout>
  <Heading>
    Administrador
    {#if $loggedIn}
      <button class="logout-button" on:click={logOut}>
        <i class="fas fa-sign-out-alt" />
        Salir
      </button>
    {/if}
  </Heading>
  {#if $loggedIn}
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
</Layout>
