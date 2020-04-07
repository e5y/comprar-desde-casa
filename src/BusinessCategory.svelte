<script>
    import { Link } from "svelte-routing";
    export let src;
    export let id;
</script>

<li class="business-category" style="background-image:url({src})">
    <Link to="/cerca/{id}">
        <slot></slot>
    </Link>
</li>

<style>
    li {
        position: relative;
        width: calc( 50% - .25rem );
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,.4);
        border-radius: 10px;
        background-blend-mode: multiply;
        min-height: 100px;
        background-size: cover;
        margin-bottom: .5rem;
        color: white;
        font-weight: 500;
        text-shadow: 1px 1px 5px rgba(0,0,0,.2);
        box-shadow: 0 1px 5px rgba(0,0,0,.2);
        font-size: 1.25rem;
    }
</style>