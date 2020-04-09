import { writable } from "svelte/store";

export const googleMapsLoaded = writable(false);
export const loggedIn = writable(false);
export const eventPWA = writable(null);