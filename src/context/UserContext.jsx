import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getUserDeliveryAddress,
  getUserDetails,
  getUserOrders,
  onAuthStateChangedListener,
} from "../utils/firebase";

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

  useEffect(() => {
    fetchAddresses();
    fetchOrders();
  }, [currentUser, userDetails]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        // fetch user data
        const userData = await getUserDetails(user);
        setUserDetails(userData);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [currentUser]);

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
    orders
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
