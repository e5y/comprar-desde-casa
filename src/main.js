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

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCeMIytvcgakZJfwf1B-8qfujq7b9VPZqk",
	authDomain: "pedime-lo-que-quieras.firebaseapp.com",
	databaseURL: "https://pedime-lo-que-quieras.firebaseio.com",
	projectId: "pedime-lo-que-quieras",
	storageBucket: "pedime-lo-que-quieras.appspot.com",
	messagingSenderId: "691587000634",
	appId: "1:691587000634:web:89da965bca31e21a688803",
	measurementId: "G-SKMV86KYJH"
};
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

export default app;

