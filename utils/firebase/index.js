import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  Timestamp,
  where,
  onSnapshot,
  deleteDoc,
  FieldValue,
  Firestore,
  increment,
} from "firebase/firestore";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDLqF47sS8H9DPomhwYlu693OOAgP8VhuM",
  authDomain: "crwn-clothing-db-fd5d6.firebaseapp.com",
  projectId: "crwn-clothing-db-fd5d6",
  storageBucket: "crwn-clothing-db-fd5d6.appspot.com",
  messagingSenderId: "975106281194",
  appId: "1:975106281194:web:3a6515bb811dfe94469193",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// create user details
export const createUserDocumentFromAuth = async (userAuth, username) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        username,
        transactions: [],
        uid: userAuth.uid,
        userRole: "user",
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// get user details

export const getUserDetails = async (userAuth) => {
  if (!userAuth) return "";

  try {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    }
  } catch (e) {
    console.log(e);
  }

  return {};
};
