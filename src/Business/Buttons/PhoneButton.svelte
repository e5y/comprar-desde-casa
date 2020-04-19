<script>
  export let phone;
</script>

<style>
  a {
    text-decoration: none;
    margin: 0.15rem 0;
    background: #1e4cf5;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    text-align: center;
  }

  a i {
    margin-right: 0.25rem;
    width: 1rem;
  }
</style>

<a href="tel:{phone}">
  <i class="fas fa-phone" />
  Llamar ahora
</a>
