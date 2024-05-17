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

  const fetchAllOrders = async () => {
    try {
      setFetchingOrders(true);
      const docsRef = await getDocs(collection(db, "orders"));

      const temp = await Promise.all(
        docsRef.docs.map(async (doc) => {
          const addressDetails = await fetchAddressDetails(
            doc.data().addressId
          );
          return { ...doc.data(), id: doc.id, addressDetails };
        })
      );
      setFetchingOrders(false);
      setAllOrders(temp);
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
