<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let open = true;

  const close = () => {
    open = false;
    dispatch("close");
  };
</script>

<style>
  .popup-bg {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
  }
  .popup {
    position: absolute;
    width: 90vw;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 10px;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .popup :global(.business) {
    margin: 0;
  }

  .popup-bg .close-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    bottom: 1rem;
    color: white;
    font-size: 0.9rem;
    width: 100%;
    padding: 0 1rem;
    text-align: center;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.9);
  }
</style>

{#if open}
  <section class="popup-bg" on:click|self={close}>
    <section class="popup">
      <slot />
    </section>
    <p class="close-text" on:click={close}>
      Toca en cualquier parte para cerrar
    </p>
  </section>
{/if}
