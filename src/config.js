export const productionConfig = {
    environment: 'production',
    firebase: {
        apiKey: "AIzaSyCeMIytvcgakZJfwf1B-8qfujq7b9VPZqk",
        authDomain: "pedime-lo-que-quieras.firebaseapp.com",
        databaseURL: "https://pedime-lo-que-quieras.firebaseio.com",
        projectId: "pedime-lo-que-quieras",
        storageBucket: "pedime-lo-que-quieras.appspot.com",
        messagingSenderId: "691587000634",
        appId: "1:691587000634:web:89da965bca31e21a688803",
        measurementId: "G-SKMV86KYJH"
    }
};

export const developmentConfig = {
    environment: 'development',
    firebase: {
        apiKey: "AIzaSyCeMIytvcgakZJfwf1B-8qfujq7b9VPZqk",
        authDomain: "pedime-lo-que-quieras.firebaseapp.com",
        databaseURL: "https://pedime-lo-que-quieras.firebaseio.com",
        projectId: "pedime-lo-que-quieras",
        storageBucket: "pedime-lo-que-quieras.appspot.com",
        messagingSenderId: "691587000634",
        appId: "1:691587000634:web:89da965bca31e21a688803",
        measurementId: "G-SKMV86KYJH"
    }
};

export const config = process.env.ENVIRONMENT === 'production' ? productionConfig : developmentConfig;