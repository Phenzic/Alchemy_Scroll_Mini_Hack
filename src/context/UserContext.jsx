import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  db,
  getAllProducts,
  getUserDeliveryAddress,
  getUserDetails,
  getUserOrders,
  onAuthStateChangedListener,
} from "../utils/firebase";
import { collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [fetchingAllProducts, setFetchingAllProducts] = useState(false);

  const fetchAddresses = async () => {
    if (currentUser) {
      setLoadingAddress(true);
      const addresses = await getUserDeliveryAddress(userDetails.uid);
      setLoadingAddress(false);
      setDeliveryAddresses(addresses);
    }
  };
  const fetchOrders = async () => {
    if (currentUser) {
      setLoadingOrders(true);
      const ordersLocal = await getUserOrders(userDetails.uid);
      setLoadingOrders(false);
      setOrders(ordersLocal);
    }
  };
  const fetchAllProducts = async () => {
    setFetchingAllProducts(true);
    const productsLocal = await getAllProducts();
    setAllProducts(productsLocal);
    setFetchingAllProducts(false);
  };

  useEffect(() => {
    fetchAllProducts();
    if (userDetails && Object.keys(userDetails).length > 0) {
      fetchAddresses();
      fetchOrders();
    }
  }, [currentUser, userDetails]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        setCurrentUser(user);
      }

      const userLocDetails = localStorage.getItem("userDetails");

      if (user && userLocDetails && userLocDetails !== undefined) {
        setUserDetails(JSON.parse(userLocDetails));
      }

      if (user) {
        const userData = await getUserDetails(user);
        if (userData) {
          setUserDetails(userData);
          localStorage.setItem("userDetails", JSON.stringify(userData));
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const value = {
    currentUser,
    setCurrentUser,
    userDetails,
    setUserDetails,
    deliveryAddresses,
    setDeliveryAddresses,
    fetchAddresses,
    loadingAddress,
    setLoadingAddress,
    loadingOrders,
    setLoadingOrders,
    orders,
    allProducts,
    fetchingAllProducts,
    fetchOrders,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
