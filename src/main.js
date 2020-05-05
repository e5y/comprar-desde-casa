import { googleMapsLoaded, db, geo, eventPWA, loggedIn } from "./stores.js";
import { config } from "./config.js";

import App from './App.svelte';

import * as geofirex from "geofirex";

/**
 * ASCII console signature & build info
 */
console.log(`%c
   ______                                         ____                __        ______
  / ____/___  ____ ___  ____  _________ ______   / __ \\___  _________/ /__     / ____/___ __________ _
 / /   / __ \\/ __ \`__ \\/ __ \\/ ___/ __ \`/ ___/  / / / / _ \\/ ___/ __  / _ \\   / /   / __ \`/ ___/ __ \`/
/ /___/ /_/ / / / / / / /_/ / /  / /_/ / /     / /_/ /  __(__  ) /_/ /  __/  / /___/ /_/ (__  ) /_/ /
\\____/\\____/_/ /_/ /_/ .___/_/   \\__,_/_/     /_____/\\___/____/\\__,_/\\___/   \\____/\\__,_/____/\\__,_/
				  /_/
`, 'color:orange; font-weight: bold;');

console.groupCollapsed('Build');

console.group('General');
console.table({
	Environment: config.environment,
	Deployment: config.deployment
});
console.groupEnd();

console.groupCollapsed('Firebase');
console.table(config.firebase);
console.groupEnd();

console.groupEnd();

/**
 * Google Maps setup
 */
window.initMap = () => {
	googleMapsLoaded.set(true);
}

/**
 * Firebase & Geofirex setup
 */

if (!firebase.apps.length) {
	firebase.initializeApp(config.firebase);
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
		console.log('❌ Firebase Auth state change detection failed', error);
	}
);

/**
 * Service Worker setup
 */
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js').then(function (registration) {
			console.log('✔️ Service Worker registered successfully', registration.scope);
		}, function (err) {
			console.log('❌ Service Worker failed to be registered', err);
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

