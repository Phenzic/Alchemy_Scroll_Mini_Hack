import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { db } from "../utils/firebase";

const DriverContext = createContext();

export const useDriver = () => {
  return useContext(DriverContext);
};

const DriverProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);

  const fetchAddressDetails = async (id) => {
    const docRef = await getDoc(doc(db, "addresses", id));
    if (docRef.exists()) {
      return docRef.data();
    } else {
      return null;
    }
  };

  const fetchUserDetails = async (id) => {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
      return docRef.data();
    } else {
      return null;
    }
  };

  const fetchAllOrders = async () => {
    try {
      setFetchingOrders(true);
      const docsRef = await getDocs(collection(db, "orders"));
      let temp = [];
      Promise.all(
        docsRef.forEach(async (data) => {
          // const addressDetails = await fetchAddressDetails(
          //   data.data().addressId
          // );
          const userDetails = await fetchUserDetails(data.data().userId);
          temp.push({ ...data.data(), userDetails });
        })
      ).then(() => {
        setAllOrders(temp);
        console.log(temp);
      });
      setFetchingOrders(false);
    } catch (error) {
      setFetchingOrders(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const value = { allOrders, fetchingOrders, fetchAllOrders };
  return (
    <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
  );
};

export default DriverProvider;
