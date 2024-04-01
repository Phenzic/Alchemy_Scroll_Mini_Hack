import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {


  const value = {};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;