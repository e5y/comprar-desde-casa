<script>
  export let type = "regular";

  let icon;

  switch (type) {
    case "success":
      icon = "fas fa-check";
      break;
    case "error":
      icon = "fas fa-times-circle";
      break;
    default:
      icon = "fas fa-info-circle";
  }

  let open = true;
  const close = () => {
    open = false;
  };
</script>

<style>
  .info {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  .info.success {
    background-color: #b5ff95;
  }

  .info.error {
    background-color: #ff9595;
  }

  .info p {
    margin: 0;
  }
  :global(.info a) {
    color: black;
  }
  .info .icon {
    margin-right: 0.5rem;
  }
  .info .close-icon {
    margin-left: auto;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
  }
</style>

{#if open}
  <section class="info {type}">
    <i class="{icon} icon" />
    <p>
      <slot />
    </p>
    <i class="fas fa-times close-icon" on:click={close} />
  </section>
{/if}
