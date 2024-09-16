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
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  ref,
} from "firebase/database";
import { getStorage } from "firebase/storage";
import { useUser } from "../../context/UserContext";

const firebaseConfig = {
  apiKey: "AIzaSyBCibR01qLKpujYEMyDb1BZY685Vn4hTW8",
  authDomain: "jamazan-d4bc5.firebaseapp.com",
  projectId: "jamazan-d4bc5",
  storageBucket: "jamazan-d4bc5.appspot.com",
  messagingSenderId: "398959050641",
  appId: "1:398959050641:web:7103966401fd9144e6e430",
  measurementId: "G-6JHPVBQ83J"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const db = getFirestore();
export const storage = getStorage(firebaseApp);
export const rdb = getDatabase(firebaseApp);



export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
  localStorage.removeItem("authUser");
  localStorage.removeItem("userDetails");
  window.location.reload();
};

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
      return {
        email,
        createdAt,
        username,
        transactions: [],
        uid: userAuth.uid,
        userRole: "user",
      };
    } catch (error) {
      throw new Error("Failed to create details: " + error);
    }
  }
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
      return {
        email,
        createdAt,
        username,
        businessName: business_name,
        phoneNumber: phone_number,
        transactions: [],
        uid: userAuth.uid,
        userRole: "seller",
      };
    } catch (error) {
      throw new Error("Failed to create details: " + error);
    }
  }
};

// get all users in  collection
export const totalUsers = async () => {
  const data = [];
  try {
    const usersCollection = collection(db, "users");
    const eachUser = await getDocs(usersCollection);
    eachUser.forEach(function (user) {
      data.push(user.data());
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// get user details
export const getUserDetails = async (userAuth) => {
  if (!userAuth) return null;

  try {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Failed to fetch user details: " + error);
  }
};

// get screen collection
export const getScreenCollections = async function () {
  const data = [];
  const screenCollection = collection(db, "piechart");
  try {
    const screenSnap = await getDocs(screenCollection);
    screenSnap.forEach(function (eachData) {
      data.push(eachData.data());
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getOrders = async function () {
  const ordersCollection = collection(db, "orders");
  const data = [];
  try {
    const orderSnapshot = await getDocs(ordersCollection);
    orderSnapshot.forEach(function (eachData) {
      data.push(eachData.data());
    });
    console.log("seller order", data)

    return data;
  } catch (error) {
    console.log(error);
  }
};




// update screenCollection
export const updateScreenCollection = async function (object) {
  const screenRef = doc(db, "piechart", "UCTclap25Sp9bDPZUnFx");
  try {
    const updateScreen = await updateDoc(screenRef, object);
    return updateScreen;
  } catch (error) {
    console.log(error);
  }
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

export const getUserOrders = async (userId) => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    let temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    return temp;
  } catch (e) {
    console.log(e);
  }

  return {};
};

export const getAllProducts = async () => {
  try {
    const q = collection(db, "products");
    let temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    return temp;
  } catch (e) {
    console.log(e);
  }

  return {};
};

