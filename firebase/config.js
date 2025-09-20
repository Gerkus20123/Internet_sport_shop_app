// src/firebase/config.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Twój obiekt konfiguracyjny Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6KcKIFUyhSZWX0pnlKJWOF249tJH0Hac",
  authDomain: "internet-shop-app-90c99.firebaseapp.com",
  projectId: "internet-shop-app-90c99",
  storageBucket: "internet-shop-app-90c99.firebasestorage.app",
  messagingSenderId: "298971510960",
  appId: "1:298971510960:web:046337067a691020512375",
  measurementId: "G-21Y8RNXM1S"
};

// Warunkowa inicjalizacja.
// Sprawdza, czy aplikacja Firebase już istnieje.
// Zapobiega błędom w środowisku Next.js (np. w trybie deweloperskim).
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
