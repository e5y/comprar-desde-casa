<script>
    import { Router, Link, Route } from "svelte-routing";
    import Home from "./Home.svelte";
    import NearMe from "./NearMe.svelte";
    import AddBusiness from "./AddBusiness.svelte";
</script>

<Router>
	<Route path="/agregar-negocio" component="{AddBusiness}"></Route>
    <Route path="/cerca/:category" let:params>
        <NearMe category="{params.category}" />
    </Route>
    <Route path="/"><Home /></Route>
</Router>