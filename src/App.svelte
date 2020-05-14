<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";

  import { config } from "./config.js";
  import { user, categories, geo, db, eventPWA } from "./stores.js";
  import { Categories } from "./classes/Categories.js";

  import Home from "./Home/Home.svelte";
  import NearMe from "./NearMe/NearMe.svelte";
  import AddBusiness from "./Business/AddBusiness.svelte";
  import EditBusiness from "./Business/EditBusiness.svelte";
  import BusinessProfile from "./Business/BusinessProfile.svelte";
  import YourBusiness from "./Business/YourBusiness.svelte";
  import Admin from "./Admin/Admin.svelte";
  import Navigation from "./Navigation/Navigation.svelte";
  import LogIn from "./Account/LogIn.svelte";

  onMount(async () => {
    $categories = new Categories(
      await $db
        .collection("categories")
        .where("visible", "==", true)
        .orderBy("order")
        .get()
    );
  });
</script>

<svelte:head>
  <title>
    {config.environment !== 'production' ? `[${config.environment}] ` : ''}
    {config.title}
  </title>
</svelte:head>

<Router>
  <Route path="/admin">
    <Admin />
  </Route>
  <Route path="/iniciar-sesion">
    <LogIn />
  </Route>
  <Route path="/tu-negocio">
    <YourBusiness />
  </Route>
  <Route path="/negocio/:id" let:params>
    <BusinessProfile id={params.id} />
  </Route>
  <Route path="/agregar-negocio">
    <AddBusiness />
  </Route>
  <Route path="/editar-negocio/:id" let:params>
    <EditBusiness id={params.id} />
  </Route>
  <Route path="/cerca">
    <NearMe category="todos" />
  </Route>
  <Route path="/cerca/:category" let:params>
    <NearMe category={params.category} />
  </Route>
  <Route path="/">
    <Home />
  </Route>
  <Navigation />
</Router>
