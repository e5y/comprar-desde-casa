import App from './App.svelte';
import { googleMapsLoaded } from "./stores";

const app = new App({
	target: document.body,

});

window.initMap = () => {
	googleMapsLoaded.set(true);
}

export default app;