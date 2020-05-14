export class User {
    constructor(firebaseUser) {
        if (firebaseUser) {
            this.details = firebaseUser;
            this.role = 'user';
            //TODO: Don't hardcode admins
            if (firebaseUser.uid == 'q6GFYtzXYRXq11Xi7ABlmhvqQMi2' || firebaseUser.uid == 'kXqHfFe36UM6Cz39YXrRRwbj07Z2') {
                this.role = 'administrator';
            }
            this.loggedIn = true;
        } else {
            this.details = {};
            this.role = 'visitor';
            this.loggedIn = false;
        }
    }

    updatePassword(password) {
        return firebase.auth().currentUser.updatePassword(password);
    }

    isAdmin() {
        return this.loggedIn && this.role === 'administrator';
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
            } catch (e) { rej(e) }
        });
    }

}