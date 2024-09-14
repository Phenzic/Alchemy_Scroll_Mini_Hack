import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { db } from "../utils/firebase";
import PropTypes from "prop-types"

export const ConfigureContext = createContext();

export const useConfigure = () => {
  return useContext(ConfigureProvider);
};

const ConfigureProvider = ({ children }) => {
  
  const configureCategoriesOptions = async () => {
    try {
      toast.loading("Adding Categoties Options")
      const documentRef = doc(db, "jamazan-options", "categories");
      const categories = [
        "Phones & Tablets",
        "Appliances",
        "Health & Beauty",
        "Supermarket",
        "Home & Office",
        "Computing",
        "Electronics",
        "Fashion",
        "Gaming",
        "Baby Products",
      ];
      await setDoc(documentRef, {
        categories,
      });
      toast.dismiss()
      toast.success("Categories Options Added")

    } catch (error) {
      toast.error(error);
    }
  };

  const values = {configureCategoriesOptions};
  return (
    <ConfigureContext.Provider value={values}>
      {children}
    </ConfigureContext.Provider>
  );
};

ConfigureProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConfigureProvider;
