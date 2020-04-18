import { loggedIn } from "./stores.js";

export const logOut = async () => {
    loggedIn.set(false);
    await firebase.auth().signOut();
}

export const arrayToDays = array => {
    const days = [
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábados",
        "domingos"
    ];
    return array.map(i => days[i]);
};

export const makeCommaSeparatedString = (arr, useOxfordComma) => {
    const listStart = arr.slice(0, -1).join(", ");
    const listEnd = arr.slice(-1);
    const conjunction =
        arr.length <= 1 ? "" : useOxfordComma && arr.length > 2 ? ", y " : " y ";

    return [listStart, listEnd].join(conjunction);
};

export const randBetween = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);