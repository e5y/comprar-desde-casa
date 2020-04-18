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
    color: #1e4cf5;
    text-decoration: none;
    margin: 0.25rem 0;
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
