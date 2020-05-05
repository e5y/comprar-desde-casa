import { googleMapsLoaded, db, geo, eventPWA, loggedIn } from "./stores.js";
import { config } from "./config.js";

console.log(config, process.env);

import App from './App.svelte';

import * as geofirex from "geofirex";

/**
 * Google Maps setup
 */
window.initMap = () => {
	googleMapsLoaded.set(true);
}

/**
 * Firebase & Geofirex setup
 */
const firebaseConfig = config.firebase;

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

firebase.analytics();
db.set(firebase.firestore());
geo.set(geofirex.init(firebase));

firebase.auth().onAuthStateChanged(
	function (user) {
		if (user) {
			loggedIn.set(true);
		} else {
			loggedIn.set(false);
		}
	},
	function (error) {
		console.log(error);
	}
);

/**
 * Service Worker setup
 */
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js').then(function (registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function (err) {
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

/**
 * PWA setup
 */
window.addEventListener("beforeinstallprompt", e => {
	e.preventDefault();
	eventPWA.set(e);
});

/**
 * Svelte setup
 */
const app = new App({
	target: document.body,
});

export default app;

