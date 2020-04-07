<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<Header></Header>
<section class="content">
    <slot></slot>
</section>
<Footer></Footer>

<style>
    .content {
        padding: 1rem;
    }
</style>