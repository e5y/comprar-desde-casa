<script>
    import Layout from "./Layout.svelte";
    import Business from "./Business.svelte";
    import Map from "./Map.svelte";

    export let category;
    export let db;
</script>

<Layout>
    {#if category === 'todos'}
        <h1>Cerca mío</h1>
    {:else}
        <h1><span class="category">{category}</span> cerca mío</h1>
    {/if}
    <Business></Business>
    <Map></Map>
</Layout>

<style>
    h1 {
        margin-top: 0;
    }
    .category {
        text-transform: capitalize;
    }
</style>