<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";

  import { config } from "./config.js";

  import Layout from "./Layout/Layout.svelte";
  import Home from "./Pages/Home.svelte";
  import LogIn from "./Pages/LogIn.svelte";
  import AddBusiness from "./Pages/AddBusiness.svelte";
  import YourBusiness from "./Pages/YourBusiness.svelte";
  import BusinessProfile from "./Pages/BusinessProfile.svelte";
  import NearMe from "./Pages/NearMe.svelte";
  import EditBusiness from "./Pages/EditBusiness.svelte";
  import EditBusinesses from "./Pages/EditBusinesses.svelte";
  import Admin from "./Pages/Admin.svelte";
  import ForgotPassword from "./Pages/ForgotPassword.svelte";
  import Navigation from "./Navigation/Navigation.svelte";
</script>

<svelte:head>
  <title>
    {config.environment !== 'production' ? `[${config.environment}] ` : ''}
    {config.title}
  </title>
</svelte:head>

<Layout>
  <Router>
    <Route path="/admin">
      <Admin />
    </Route>
    <Route path="/iniciar-sesion">
      <LogIn />
    </Route>
    <Route path="/tus-negocios">
      <YourBusiness />
    </Route>
    <Route path="/negocio/:id" let:params>
      <BusinessProfile id={params.id} />
    </Route>
    <Route path="/agregar-negocio/:id" let:params>
      <AddBusiness id={params.id} />
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
    <Route path="/olvide-mi-contrasena">
      <ForgotPassword />
    </Route>
    <Route path="/olvide-mi-contrasena/:email" let:params>
      <ForgotPassword email={params.email} />
    </Route>
    <Route path="/cerca/:category" let:params>
      <NearMe category={params.category} />
    </Route>
    <Route path="/">
      <Home />
    </Route>
    <Navigation />
  </Router>
</Layout>
