import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSAJeLkycXLxKBdwoxLm0OpDQR9aFtf4o",
  authDomain: "fir-v9-24725.firebaseapp.com",
  projectId: "fir-v9-24725",
  storageBucket: "fir-v9-24725.appspot.com",
  messagingSenderId: "668738604287",
  appId: "1:668738604287:web:8de0dce463f000c708d0ca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });