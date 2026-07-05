import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZVBC-UagEIVwsILjkwMSBayTagbcnjUc",
  authDomain: "ragwebsummarizer.firebaseapp.com",
  projectId: "ragwebsummarizer",
  storageBucket: "ragwebsummarizer.firebasestorage.app",
  messagingSenderId: "429265243706",
  appId: "1:429265243706:web:aa70883af65b8f7579ef03",
  measurementId: "G-E5JNPYJQXP"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider);
};
