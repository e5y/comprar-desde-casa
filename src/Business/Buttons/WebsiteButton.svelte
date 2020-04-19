<script>
  export let url;

  let referencedUrl = { href: "" };

  try {
    referencedUrl = new URL(url);
    referencedUrl.searchParams.append("ref", `comprardesdecasa`);
  } catch (e) {}
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

<a href={referencedUrl.href} target="_blank">
  <i class="fas fa-link" />
  Ver sitio web
</a>
