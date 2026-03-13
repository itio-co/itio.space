// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

// Firebase App Hosting auto-injects FIREBASE_WEBAPP_CONFIG at build time.
// For dev environments (local or cloud), fall back to NEXT_PUBLIC_ env vars.
const autoConfig = process.env.FIREBASE_WEBAPP_CONFIG
  ? JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG)
  : null;

const firebaseConfig = autoConfig ?? {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
// Set ignoreUndefinedProperties to true
export const db = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

export default app;
