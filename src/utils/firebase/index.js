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
  apiKey: "AIzaSyDZ66atUo9ldac_rdj_y1m5MucDmPQkqEo",
  authDomain: "campushostels-756c8.firebaseapp.com",
  projectId: "campushostels-756c8",
  storageBucket: "campushostels-756c8.appspot.com",
  messagingSenderId: "559872753013",
  appId: "1:559872753013:web:22c33f238813968f39273c",
  measurementId: "G-EZX82DZ5CJ",
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

// create user details
export const createSellerDocumentFromAuth = async (
  userAuth,
  username,
  business_name,
  phone_number
) => {
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
        businessName: business_name,
        phoneNumber: phone_number,
        transactions: [],
        uid: userAuth.uid,
        userRole: "seller",
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

// get user delivery address

export const getUserDeliveryAddress = async (userId) => {
  try {
    const q = query(collection(db, "addresses"), where("userId", "==", userId));
    let temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  } catch (e) {
    console.log(e);
  }

  return {};
};
