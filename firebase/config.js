// src/firebase/config.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Twój obiekt konfiguracyjny Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: ",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ",
  measurementId: ""
};

// Warunkowa inicjalizacja.
// Sprawdza, czy aplikacja Firebase już istnieje.
// Zapobiega błędom w środowisku Next.js (np. w trybie deweloperskim).
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
