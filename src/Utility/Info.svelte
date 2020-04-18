<script>
  import Cookies from "js-cookie";
  import timestring from "timestring";

  export let type = "regular";
  export let rest = null;
  export let id = null;
  export let icon;

  if (!icon) {
    switch (type) {
      case "success":
        icon = "fas fa-check";
        break;
      case "error":
        icon = "fas fa-times-circle";
        break;
      case "warning":
        icon = "fas fa-exclamation-triangle";
        break;
      default:
        icon = "fas fa-info-circle";
    }
  }

  let open = true;

  if (id && rest) {
    const cookie = Cookies.get(`info-${id}`);
    if (cookie) {
      open = false;
    }
  }

  const close = () => {
    open = false;
    if (id && rest) {
      const expires = new Date(new Date().getTime() + timestring(rest, "ms"));
      console.log(expires);
      Cookies.set(`info-${id}`, "resting", { expires });
    }
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

  .info.warning {
    background-color: #ffed95;
  }

  .info.primary {
    background-color: #ff9001;
    color: white;
  }

  .info.primary .close-icon {
    color: rgba(0, 0, 0, 0.2);
  }

  .info p {
    margin: 0;
  }

  .info .icon {
    margin-right: 0.5rem;
  }
  .info .close-icon {
    margin-left: auto;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    padding-left: 0.5rem;
  }
  .info :global(a) {
    color: black;
  }
  .info :global(button) {
    color: black;
    text-decoration: underline;
    background: 0;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    border: 0;
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
