<script>
    import { Link } from "svelte-routing";
</script>

<header>
    <section class="logo">
        <Link to="/">
            <img alt src="/logo.png">
        </Link>
    </section>
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
</header>

<style>

    header {
        background: white;
        position: sticky;
        top: 0;
        z-index: 1;
        box-shadow: 1px 1px 5px rgba(0,0,0,.2);
    }

    .logo {
        max-width: 200px;
        display: block;
        margin: auto;
        margin-top: 1rem;
        width: 80%;
    }
    .logo img {
        width: 100%;
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

    :global(nav a i) {
        transform: scale(1);
        transition: .1s ease;
    }

    :global(nav a:active i),
    :global(nav a:hover i),
    :global(nav a:focus i) {
        transform: scale(1.1);
    }
</style>