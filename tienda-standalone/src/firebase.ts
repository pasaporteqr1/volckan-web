import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { initializeFirestore, getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAuth, type Auth } from 'firebase/auth';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let auth: Auth | null = null;

if (apiKey && apiKey !== 'tu_api_key_aqui') {
  try {
    const existingApps = getApps();
    if (existingApps.length > 0) {
      app = existingApps[0];
      try {
        db = initializeFirestore(app, { ignoreUndefinedProperties: true });
      } catch {
        db = getFirestore(app);
      }
    } else {
      app = initializeApp(firebaseConfig);
      db = initializeFirestore(app, { ignoreUndefinedProperties: true });
    }
    storage = getStorage(app);
    auth = getAuth(app);
  } catch (err) {
    console.warn('[Firebase] No se pudo inicializar Firebase en modo online, usando modo local:', err);
  }
} else {
  console.info('[Firebase] Variables de Firebase no configuradas o en modo plantilla. La tienda operará en modo catálogo offline/local.');
}

export { app, db, storage, auth };
export default app;
