export const config = {
    environment: process.env.CDC_ENVIRONMENT,
    version: process.env.CDC_VERSION,
    firebase: {
        apiKey: process.env.CDC_FIREBASE_API_KEY,
        authDomain: process.env.CDC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.CDC_FIREBASE_DATABSE_URL,
        projectId: process.env.CDC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.CDC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.CDC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.CDC_FIREBASE_APP_ID,
        measurementId: process.env.CDC_FIREBASE_MEASUREMENT_ID
    }
};