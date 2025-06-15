import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCEI_MK7FcPpV0AU9tJOeEchUQjWBRZfvE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "yaskin-club.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "yaskin-club",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "yaskin-club.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456789012345678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app; 