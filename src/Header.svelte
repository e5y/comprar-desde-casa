<script>
    import { Link } from "svelte-routing";
</script>

<Link to="/">
    <img alt class="logo" src="/logo.png">
</Link>

<nav>
    <Link to="/">
        <i class="fas fa-home"></i>
        Inicio
    </Link>
    <Link to="/cerca/todos">
        <i class="fas fa-map-marker-alt"></i>
        Cerca mío
    </Link>
    <Link to="/agregar-negocio">
        <i class="fas fa-plus-circle"></i>
        Agregar negocio
    </Link>
</nav>

<style>
    .logo {
        max-width: 200px;
        display: block;
        margin: auto;
        width: 80%;
    }
    nav {
        text-align: center;
        display: flex;
        justify-content: space-between;
        margin: 1rem;
    }
    :global(nav a),
    :global(nav a:visited) {
        color: black;
        text-decoration: none;
    }
</style>