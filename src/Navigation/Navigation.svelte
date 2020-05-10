<script>
  import { Link } from "svelte-routing";

  const getProps = ({ location, href, isPartiallyCurrent, isCurrent }) => {
    const { pathname } = location;
    const isActive = href === "/" ? pathname === href : pathname.includes(href);

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: "navigation-item active" };
    }

    return { class: "navigation-item" };
  };
</script>

<style>
  nav {
    width: 100%;
    background: white;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  :global(.navigation-item) {
    padding: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    text-decoration: none;
    font-size: 0.8rem;
    color: black;
    width: 5rem;
  }
  i {
    font-size: 1.25rem;
    color: darkgray;
    margin-bottom: 0.25rem;
    transition: 0.25s;
  }
  :global(.navigation-item.active) i {
    color: #ff9001;
  }
</style>

<nav class="navigation">
  <Link to="/" {getProps}>
    <i class="fas fa-home" />
    Inicio
  </Link>
  <Link to="/cerca" {getProps}>
    <i class="fas fa-map-marker-alt" />
    Cerca mío
  </Link>
  <Link to="/agregar-negocio" {getProps}>
    <i class="fas fa-store" />
    Tu negocio
  </Link>
</nav>
