// Firebase設定とサービスの初期化
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyC38BUxyaXpSMurfgUTgyVb15_OmHOenn4",
  authDomain: "english-practice-app-be1ec.firebaseapp.com",
  projectId: "english-practice-app-be1ec",
  storageBucket: "english-practice-app-be1ec.firebasestorage.app",
  messagingSenderId: "1671767825",
  appId: "1:1671767825:web:9f55e0891da8f40c268eb0",
  measurementId: "G-D12K9N3YRV"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// サービス初期化
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();

// Google認証プロバイダー設定
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;