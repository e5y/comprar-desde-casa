<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";

  import { loggedIn, categories, geo, db, eventPWA } from "./stores.js";
  import { Categories } from "./classes/Categories.js";

  import Home from "./Home/Home.svelte";
  import NearMe from "./NearMe/NearMe.svelte";
  import AddBusiness from "./Business/AddBusiness.svelte";
  import EditBusiness from "./Business/EditBusiness.svelte";
  import Admin from "./Admin/Admin.svelte";

  import * as geofirex from "geofirex";

  firebase.initializeApp({
    apiKey: "AIzaSyCeMIytvcgakZJfwf1B-8qfujq7b9VPZqk",
    authDomain: "pedime-lo-que-quieras.firebaseapp.com",
    databaseURL: "https://pedime-lo-que-quieras.firebaseio.com",
    projectId: "pedime-lo-que-quieras",
    storageBucket: "pedime-lo-que-quieras.appspot.com",
    messagingSenderId: "691587000634",
    appId: "1:691587000634:web:89da965bca31e21a688803",
    measurementId: "G-SKMV86KYJH"
  });

  $db = firebase.firestore();
  $geo = geofirex.init(firebase);

  onMount(async () => {
    $categories = new Categories(
      await $db
        .collection("categories")
        .where("visible", "==", true)
        .orderBy("order")
        .get()
    );
  });

  onMount(() => {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      eventPWA.set(e);
    });

    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          loggedIn.set(true);
        } else {
          loggedIn.set(false);
        }
      },
      function(error) {
        console.log(error);
      }
    );
  });
</script>

<Router>
  <Route path="/admin">
    <Admin />
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
