// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDiCw_eNgh-QjoEHoAm_0wgyUYcp8j3xbg",
  authDomain: "itio-space.firebaseapp.com",
  projectId: "itio-space",
  storageBucket: "itio-space.firebasestorage.app",
  messagingSenderId: "974128133754",
  appId: "1:974128133754:web:1d9fc53206e4e7372d2dc3",
  measurementId: "G-T2SC9Z122Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
