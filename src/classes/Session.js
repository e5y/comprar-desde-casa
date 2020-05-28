export class Session {
  constructor(user) {
    if (user) {
      /**
       * This is not frontend validation, just aesthetics.
       * Administrator privileges are validated at the server level.
       *
       * TODO: Implement an actual role system.
       */
      this._isAdmin =
        user.uid === "q6GFYtzXYRXq11Xi7ABlmhvqQMi2" ||
        user.uid === "pSGqTckqVyfJ6nasmqCt6yU5rvr2";
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

  /**
   * TODO: Implement admin detection.
   */
  get isAdmin() {
    return this._isAdmin;
  }
  get isLoggedIn() {
    return this._isLoggedIn;
  }

  async sendPasswordReset(email) {
    await firebase.auth().sendPasswordResetEmail(email);
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
