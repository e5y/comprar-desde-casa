<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import { loggedIn, eventPWA } from "./stores.js";
  import Home from "./Home.svelte";
  import NearMe from "./NearMe.svelte";
  import AddBusiness from "./AddBusiness.svelte";
  import Admin from "./Admin.svelte";
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

  const db = firebase.firestore();
  const geo = geofirex.init(firebase);

  let categories;
  onMount(async () => {
    categories = await db
      .collection("categories")
      .where("visible", "==", true)
      .orderBy("order")
      .get();
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
    <Admin {db} />
  </Route>
  <Route path="/agregar-negocio">
    <AddBusiness {db} {geo} {categories} />
  </Route>
  <Route path="/cerca/:category" let:params>
    <NearMe category={params.category} {db} {geo} {categories} />
  </Route>
  <Route path="/">
    <Home {categories} />
  </Route>
</Router>
