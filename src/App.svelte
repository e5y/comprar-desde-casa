<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./Home.svelte";
  import NearMe from "./NearMe.svelte";
  import AddBusiness from "./AddBusiness.svelte";

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

  let categories;
  onMount(async () => {
    categories = await db.collection("categories").get();
  });
</script>

<Router>
  <Route path="/agregar-negocio">
    <AddBusiness {db} />
  </Route>
  <Route path="/cerca/:category" let:params>
    <NearMe category={params.category} {db} />
  </Route>
  <Route path="/">
    <Home {categories} />
  </Route>
</Router>
