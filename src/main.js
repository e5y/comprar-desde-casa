import App from './App.svelte';
import { googleMapsLoaded } from "./stores";

const app = new App({
	target: document.body,

});

window.initMap = () => {
	googleMapsLoaded.set(true);
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js').then(function (registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function (err) {
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

export default app;

