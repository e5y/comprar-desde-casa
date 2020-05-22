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

import { Database } from "./classes/Database.js";
import { Session } from "./classes/Session.js";

import App from "./App.svelte";

import "./console.js";

/**
 * Google Maps calls the googleMapsLoaded callback when it finishes loading.
 *
 * @link https://developers.google.com/maps/documentation/javascript/tutorial
 */
googleMapsLoaded.subscribe(checkLoaded);
window.googleMapsLoaded = () => googleMapsLoaded.set(true);

/**
 * Firebase initialization (includes App, Database, Analytics & Auth initialization)
 */
if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

firebase.analytics();

db.set(new Database(firebase.firestore()));

session.subscribe(checkLoaded);
firebase.auth().onAuthStateChanged((user) => session.set(new Session(user)));

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
categories.subscribe(checkLoaded);
(async () => categories.set(await get(db).getCategories()))();

/**
 * Svelte initialization
 */
const app = new App({
  target: document.body,
});

export default app;
