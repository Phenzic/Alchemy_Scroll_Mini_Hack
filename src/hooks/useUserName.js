import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore"; // Ensure you have this import
import toast from 'react-hot-toast';
import { db } from '../utils/firebase';


export const useUserName = (addressId) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await getDoc(doc(db, "addresses", addressId));
        if (res.exists()) {
          setUserName(res.data().first_name);
        } else {
          toast.error("No user found with the provided ID");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user details");
      }
    };

    if (addressId) {
      fetchUserName();
    }
  }, [addressId]);

  return userName;
};
