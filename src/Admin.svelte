<script>
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import Layout from "./Layout.svelte";
  import AdminBusinessList from "./AdminBusinessList.svelte";

  export let db;
  export let geo;
  export let categories;

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
</script>

<style>
  h1 {
    margin-top: 0;
  }
  :global(.svelte-tabs) {
    font-size: 0.9rem;
  }
</style>

<Layout>
  <h1>Administrador</h1>
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
        {db}
        businesses={pending}
        on:load={onListLoad} />
    </TabPanel>

    <TabPanel>
      <AdminBusinessList
        collection="approved_businesses"
        {db}
        businesses={approved}
        on:load={onListLoad} />
    </TabPanel>

    <TabPanel>
      <AdminBusinessList
        collection="rejected_businesses"
        {db}
        businesses={rejected}
        on:load={onListLoad} />
    </TabPanel>
  </Tabs>
</Layout>
