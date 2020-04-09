<script>
  import { createEventDispatcher } from "svelte";
  import Business from "./Business.svelte";
  export let business;
  export let collection;

  const dispatch = createEventDispatcher();
  const onApprove = () => {
    dispatch("approved", { business, collection });
  };
  const onReject = () => {
    dispatch("rejected", { business, collection });
  };
</script>

<style>
  .controls {
    width: 100%;
    margin-top: -1.5rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .controls button {
    border: 0;
    padding: 0.5rem 1rem;
    font-family: Roboto;
    font-size: 1rem;
    color: black;
    border-radius: 10px;
    margin: 0 0.25rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  .controls .approve {
    background: #b5ff95;
  }

  .controls .dissaprove {
    background: #ff9595;
  }
</style>

<Business {business} />
<section class="controls">
  {#if collection === 'rejected_businesses' || collection === 'pending_businesses'}
    <button class="approve" on:click={onApprove}>
      <i class="fas fa-check" />
      Aprobar
    </button>
  {/if}
  {#if collection === 'approved_businesses' || collection === 'pending_businesses'}
    <button class="dissaprove" on:click={onReject}>
      <i class="fas fa-times" />
      Desaprobar
    </button>
  {/if}
</section>
