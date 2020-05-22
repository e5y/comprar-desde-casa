import { get } from "svelte/store";

export const installPWA = () => get(installPWAEvent).prompt();

export const getPosition = () =>
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => res(position),
      (e) => rej(e),
      { enableHighAccuracy: true }
    );
  });

export const arrayToDays = (array) => {
  const days = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábados",
    "domingos",
  ];
  return array.map((i) => days[i]);
};

export const makeCommaSeparatedString = (arr, useOxfordComma) => {
  const listStart = arr.slice(0, -1).join(", ");
  const listEnd = arr.slice(-1);
  const conjunction =
    arr.length <= 1 ? "" : useOxfordComma && arr.length > 2 ? ", y " : " y ";

  return [listStart, listEnd].join(conjunction);
};

export const randBetween = (a, b) =>
  Math.floor(Math.random() * (b - a + 1) + a);
