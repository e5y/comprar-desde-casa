<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";

  import { loggedIn, categories, geo, db, eventPWA } from "./stores.js";
  import { Categories } from "./classes/Categories.js";

  import Home from "./Home/Home.svelte";
  import NearMe from "./NearMe/NearMe.svelte";
  import AddBusiness from "./Business/AddBusiness.svelte";
  import EditBusiness from "./Business/EditBusiness.svelte";
  import BusinessProfile from "./Business/BusinessProfile.svelte";
  import Admin from "./Admin/Admin.svelte";

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

<Router>
  <Route path="/admin">
    <Admin />
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
  <Route path="/cerca/todos">
    <NearMe category="todos" />
  </Route>
  <Route path="/cerca/:category" let:params>
    <NearMe category={params.category} />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Router>
