export class Session {
  constructor(user) {
    if (user) {
      this._isAdmin = false;
      this._isLoggedIn = true;
      this._details = {};
      Object.assign(this._details, user);
    } else {
      this._isAdmin = false;
      this._isLoggedIn = false;
    }
  }
  get id() {
    return this._details.uid;
  }
  get isAdmin() {
    return this._isAdmin;
  }
  get isLoggedIn() {
    return this._isLoggedIn;
  }

  updatePassword(password) {
    return firebase.auth().currentUser.updatePassword(password);
  }

  logIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return firebase.auth().signOut();
  }

  register(email, password, details) {
    return new Promise(async (res, rej) => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.updateProfile(details);
        res();
      } catch (e) {
        rej(e);
      }
    });
  }
}
