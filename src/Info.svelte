<style>
  .info {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }
  .info p {
    margin: 0;
  }
  :global(.info a) {
    color: black;
  }
  .info i {
    margin-right: 0.5rem;
  }
</style>

<section class="info">
  <i class="fas fa-info-circle" />
  <p>
    <slot />
  </p>
</section>
