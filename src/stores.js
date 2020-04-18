import { writable } from "svelte/store";

export const categories = writable(null);
export const db = writable(null);
export const geo = writable(null);

export const googleMapsLoaded = writable(false);
export const loggedIn = writable(false);
export const eventPWA = writable(null);