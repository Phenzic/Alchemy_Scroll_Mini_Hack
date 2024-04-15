import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getUserDetails,
  onAuthStateChangedListener,
} from "../../utils/firebase";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});

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

  console.log(userDetails);

  const value = { currentUser, setCurrentUser, userDetails, setUserDetails };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
