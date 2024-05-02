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
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
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
    if (Object.keys(userDetails).length > 0) {
      fetchAddresses();
      fetchOrders();
    }
  }, [currentUser, userDetails]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      localStorage.setItem("authUser", JSON.stringify(user));
      setCurrentUser(user);

      if (user) {
        const userData = await getUserDetails(user);
        setUserDetails(userData);
      }
    });
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
