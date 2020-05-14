export class User {
    constructor(firebaseUser) {
        if (firebaseUser) {
            this.details = firebaseUser;
            this.role = 'user';
            this.loggedIn = true;
        } else this.logOut();
    }

    logIn(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logOut() {
        this.details = null;
        this.role = 'visitor';
        this.loggedIn = false;
    }

}