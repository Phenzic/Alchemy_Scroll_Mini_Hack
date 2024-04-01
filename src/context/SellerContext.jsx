import React, { createContext, useContext } from "react";

const SellerContext = createContext();

export const useSeller = () => {
  return useContext(SellerContext);
};

const SellerProvider = ({ children }) => {
  const value = {};
  return (
    <SellerContext.Provider value={value}>{children}</SellerContext.Provider>
  );
};

export default SellerProvider;
