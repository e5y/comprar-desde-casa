<script>
  export let size = "large";
</script>

<style>
  p {
    text-align: center;
    margin: 2rem;
  }
  i {
    font-size: 2rem;
  }

  p.inherit {
    margin: 0;
  }
  p.inherit i {
    font-size: inherit;
  }
</style>

<p class={size}>
  <i class="fas fa-circle-notch fa-spin" role="alert" aria-busy="true" />
</p>
