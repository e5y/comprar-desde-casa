import { get } from "svelte/store";

import {
  db,
  session,
  categories,
  googleMapsLoaded,
  installPWAEvent,
  checkLoaded,
} from "./stores.js";

import { config } from "./config.js";

import App from "./App.svelte";

import "./console.js";

/**
 * Google Maps calls the googleMapsLoaded callback when it finishes loading.
 *
 * @link https://developers.google.com/maps/documentation/javascript/tutorial
 */
window.googleMapsLoaded = () => googleMapsLoaded.set(true) && checkLoaded();

/**
 * Firebase initialization (includes App, Database, Analytics & Auth initialization)
 */
if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

firebase.analytics();

db.set(new Database(firebase.firestore()));

firebase
  .auth()
  .onAuthStateChanged(
    (user) => session.set(new Session(user)) && checkLoaded()
  );

/**
 * Service Worker initialization
 *
 * TODO: Improve Service Working functionality, cache static assets.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        console.log(
          "✔️ Service Worker registered successfully",
          registration.scope
        );
      },
      function (err) {
        console.log("❌ Service Worker failed to be registered", err);
      }
    );
  });
}

/**
 * PWA event configuration
 */
window.addEventListener(
  "beforeinstallprompt",
  (e) => e.preventDefault() && installPWAEvent.set(e)
);

/**
 * Categories initialization
 */
(async () => categories.set(await get(db).getCategories()) && checkLoaded())();

/**
 * Svelte initialization
 */
const app = new App({
  target: document.body,
});

export default app;
