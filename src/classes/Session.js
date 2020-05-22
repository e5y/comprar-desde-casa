export class Session {
  constructor(user) {
    console.log("Session", user);
    if (user) {
      this._isAdmin = false;
      this._isLoggedIn = true;
    } else {
      this._isAdmin = false;
      this._isLoggedIn = false;
    }
  }
  get id() {
    return 1;
  }
  get isAdmin() {
    return this._isAdmin;
  }
  get isLoggedIn() {
    return this._isLoggedIn;
  }
  logOut() {}
}
