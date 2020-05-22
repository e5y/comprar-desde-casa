import { writable, get } from "svelte/store";

export const db = writable(null);
export const session = writable(null);
export const categories = writable(null);
export const googleMapsLoaded = writable(null);

export const loaded = writable(false);

/**
 * Every service that loads asynchronously and needs to be available
 * before Svelte App initialization should call <checkLoaded()> after
 * loading. This way the lastest necessary service that loads will
 * set the <loaded> store to true.
 */
export const checkLoaded = () =>
  get(db) &&
  get(session) &&
  get(categories) &&
  get(googleMapsLoaded) &&
  loaded.set(true);

export const installPWAEvent = writable(null);
