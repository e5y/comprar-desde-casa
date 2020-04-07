<script>
    import Layout from "./Layout.svelte";
    import Info from "./Info.svelte";
</script>

<Layout>
    <h1>Agregá tu negocio</h1>
    <Info>Si tenés un negocio y hacés delivery, podés inscribirte para aparecer en los listados de Pedime Lo Que Quieras.</Info>
    <form>
        <input type="text" name="name" placeholder="Nombre del negocio *">
        <input type="text" name="name" placeholder="Nombre del titular *">
        <input type="text" name="name" placeholder="Ubicación *">
        <input type="text" name="name" placeholder="Teléfono *">
        <input type="text" name="name" placeholder="Sitio web">
        <label for="categories">Categoría *</label>
        <select id="categories">
            <option>Verdulería</option>
            <option>Carnicería</option>
            <option>Congelado</option>
            <option>Almacén</option>
            <option>Farmacia</option>
            <option>Elaborados</option>
            <option>Ferretería</option>
            <option>Bebidas</option>
            <option>Electrónica</option>
            <option>Otro</option>
        </select>
        <input type="submit" value="Inscribirme">
    </form>
</Layout>

<style>
    h1 {
        margin-top: 0;
    }
    input,
    select {
        font-family: Roboto;
        padding: 1rem;
        border: 2px solid black;
        border-radius: 7px;
        margin: .25rem 0;
        width: 100%;
        font-size: 1rem;
        box-sizing: border-box;
    }

    label {
        display: block;
        margin: .5rem;
    }

    input[type=submit] {
        background: black;
        color: white;
    }
</style>