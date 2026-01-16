import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDzZAuTvTQGtq0ZCAIicoLS-1ojYAetY-4",
  authDomain: "adm-hub-da535.firebaseapp.com",
  projectId: "adm-hub-da535",
  storageBucket: "adm-hub-da535.firebasestorage.app",
  messagingSenderId: "423590957115",
  appId: "1:423590957115:web:dbe939793e14f86e9e8c1e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
