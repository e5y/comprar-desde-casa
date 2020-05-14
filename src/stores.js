import { writable } from "svelte/store";
import { User } from "./classes/User";

export const categories = writable(null);
export const db = writable(null);
export const geo = writable(null);

export const googleMapsLoaded = writable(false);
export const eventPWA = writable(null);

export const user = writable(new User());