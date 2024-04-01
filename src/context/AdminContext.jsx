import React, { createContext, useContext } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

const AdminProvider = ({ children }) => {


  const value = {};
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminProvider;