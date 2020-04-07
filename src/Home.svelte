<script>
    import { Link } from "svelte-routing";
    import Layout from "./Layout.svelte";
    import BusinessCategories from "./BusinessCategories.svelte";
    import BusinessCategory from "./BusinessCategory.svelte";
    import AddBusinessButton from "./AddBusinessButton.svelte";
    import Info from "./Info.svelte";
</script>

<Layout>
    <Info >
        Podés seleccionar una categoría o bien buscar <Link to="/cerca/todos">todos los negocios cerca tuyo</Link>
    </Info>
    <BusinessCategories>
        <BusinessCategory 
            id="verdulerias"
            src="categories/verduleria.jpg">
            Verdulerías
        </BusinessCategory>
        <BusinessCategory 
            id="carnicerias"
            src="categories/carniceria.jpg">
            Carnicerías
        </BusinessCategory>
        <BusinessCategory 
            id="congelados"
            src="categories/congelados.jpg">
            Congelados
        </BusinessCategory>
        <BusinessCategory 
            id="almacenes"
            src="categories/almacen.jpg">
            Almacenes
        </BusinessCategory>
        <BusinessCategory 
            id="farmacias"
            src="categories/farmacia.jpg">
            Farmacias
        </BusinessCategory>
        <BusinessCategory 
            id="elaborados"
            src="categories/elaborados.jpg">
            Elaborados
        </BusinessCategory>
        <BusinessCategory 
            id="ferreterias"
            src="categories/ferreteria.jpg">
            Ferreterías
        </BusinessCategory>
        <BusinessCategory 
            id="bebidas"
            src="categories/bebidas.jpg">
            Bebidas
        </BusinessCategory>
        <BusinessCategory 
            id="electronica"
            src="categories/electronica.jpg">
            Electrónica
        </BusinessCategory>
        <AddBusinessButton></AddBusinessButton>
    </BusinessCategories>
</Layout>