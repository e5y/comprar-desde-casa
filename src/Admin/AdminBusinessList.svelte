<script>
  import { onMount, createEventDispatcher } from "svelte";

  import { db } from "../stores.js";
  import { Businesses } from "../classes/Businesses.js";

  import Loader from "../Utility/Loader.svelte";
  import Info from "../Utility/Info.svelte";

  import BusinessModerator from "./BusinessModerator.svelte";

  export let collection;
  export let businesses;

  const fetchBusinesses = async () => {
    const results = await $db
      .collection(collection)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();

    dispatch("load", {
      collection,
      businesses: new Businesses(results)
    });
  };

  const dispatch = createEventDispatcher();

  const onApproved = e => {
    const { id, ...data } = e.detail.business;
    const collection = e.detail.collection;
    db.collection("approved_businesses")
      .doc(id)
      .set(data);
    db.collection(collection)
      .doc(id)
      .delete();
    fetchBusinesses();
  };

  const onRejected = e => {
    const { id, ...data } = e.detail.business;
    const collection = e.detail.collection;
    db.collection("rejected_businesses")
      .doc(id)
      .set(data);
    db.collection(collection)
      .doc(id)
      .delete();
    fetchBusinesses();
  };

  onMount(fetchBusinesses);
</script>

<style>
  .business-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>

{#if businesses}
  {#if businesses.length}
    <section class="business-list">
      {#each businesses as business}
        <BusinessModerator
          {business}
          {collection}
          on:approved={onApproved}
          on:rejected={onRejected} />
      {/each}
    </section>
  {:else}
    <Info type="error">No se encontraron negocios.</Info>
  {/if}
{:else}
  <Loader />
{/if}
