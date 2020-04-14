<script>
  /**
   * Usage:
   *
   * <Sticky let:sticky>
   *  {#if sticky}
   *    <p>Sticky!</p>
   *  {/if}
   * </Sticky>
   *
   * or
   *
   * <Sticky let:sticky>
   *  <p class:sticky>This paragraph will get the class sticky when its sticky!</p>
   * </Sticky>
   *
   * Notes:
   *
   * For our implementation, we'll treat both "sticky" and "stuck" as "sticky".
   * */
  import { onMount, onDestroy } from "svelte";

  import stickybits from "stickybits";

  let sticky = false,
    container,
    stickybit,
    mutationObserver,
    resizeObserver;

  onMount(() => {
    stickybit = stickybits(container, {
      useStickyClasses: true
    });

    const observerConfig = {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"]
    };
    mutationObserver = new MutationObserver(mutations => {
      sticky =
        container.classList.contains("js-is-sticky") ||
        container.classList.contains("js-is-stuck");
    });
    mutationObserver.observe(container, observerConfig);
  });

  onDestroy(() => {
    stickybit.cleanup();
    mutationObserver.disconnect();
  });

  const onResize = () => stickybit.update();
</script>

<style>
  div {
    z-index: 1;
  }
  :global(.js-is-stuck) {
    top: 0;
  }
</style>

<svelte:window on:resize={onResize} />

<div bind:this={container}>
  <slot {sticky} />
</div>
