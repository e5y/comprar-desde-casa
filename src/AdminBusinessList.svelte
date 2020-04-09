<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Loader from "./Loader.svelte";
  import Info from "./Info.svelte";
  import BusinessModerator from "./BusinessModerator.svelte";

  export let db;
  export let collection;
  export let businesses;

  const mapDocToBusiness = doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  };

  const fetchBusinesses = async () => {
    const snapshot = await db
      .collection(collection)
      .orderBy("createdAt", "desc")
      .get();
    dispatch("load", {
      collection,
      businesses: snapshot.docs.map(mapDocToBusiness)
    });
  };

  const dispatch = createEventDispatcher();
  onMount(fetchBusinesses);

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
</script>

{#if businesses}
  {#if businesses.length}
    {#each businesses as business}
      <BusinessModerator
        {business}
        {collection}
        on:approved={onApproved}
        on:rejected={onRejected} />
    {/each}
  {:else}
    <Info type="error">No se encontraron negocios.</Info>
  {/if}
{:else}
  <Loader />
{/if}
