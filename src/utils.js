import { loggedIn } from "./stores.js";

export const logOut = async () => {
    loggedIn.set(false);
    await firebase.auth().signOut();
}