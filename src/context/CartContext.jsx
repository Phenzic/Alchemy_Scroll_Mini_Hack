import { getDoc, onSnapshot } from "firebase/firestore";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { numberWithCommas } from "../utils/helper";
import { useUser } from "./UserContext";
import { db } from "../utils/firebase";
import { update } from "lodash";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const [loading, setLoading] = useState(false);
  const { userDetails } = useUser();

  const isItemInCart = (item) => {
    return cartItems.find((cartItem) => cartItem.id === item?.id);
  };

  const addToCart = (item, qty) => {
    if (isItemInCart(item)) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      toast.success("Item added to cart");
    }
  };

  const removeFromCart = (item) => {
    if (isItemInCart(item).quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      toast.success("Item removed from cart");
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };
  const removeItemFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return numberWithCommas(
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
  };

  const getCartTotalRaw = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Replace getCartItemsFromFirebase with a real-time listener
  useEffect(() => {
    if (!userDetails?.uid) return;
    const docRef = doc(db, "users", userDetails.uid);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.cartItems) {
            setCartItems(data.cartItems);
          } else {
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
      },
      (error) => {
        toast.error("Error fetching cart items: " + error.message);
      }
    );

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [db,]);

  // Modify addCartItemsFromFirebase
  const addCartItemsFromFirebase = async (item) => {
    try {
      setLoading(true)
      const docRef = doc(db, "users", userDetails.uid);

      await updateDoc(docRef, {
        cartItems: cartItems.some((cartItem) => cartItem.id === item.id)
          ? cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          : [...cartItems, { ...item, quantity: 1 }],
      });

      toast.success("Item added to cart");
      setLoading(false)
    } catch (error) {
      toast.error("Error adding item to cart: " + error.message);
      setLoading(true)
    }
  };

  const reduceProductQuantityFromFirebase = async (item) => {
    try {
      setLoading(true)
      const docRef = doc(db, "users", userDetails.uid);
      if (isItemInCart(item).quantity === 1) {
        await removeCartItemsFromFirebase(item);
      } else {
        await updateDoc(docRef, {
          cartItems: cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        });
      }

      toast.success("Item quantity reduced");
      setLoading(false)
    } catch (error) {
      toast.error("Error reducing item quantity: " + error.message);
      setLoading(false)
    }
  };
  // Modify removeCartItemsFromFirebase
  const removeCartItemsFromFirebase = async (item) => {
    try {
      setLoading(true);
      const docRef = doc(db, "users", userDetails.uid);

      await updateDoc(docRef, {
        cartItems: cartItems.filter((cartItem) => cartItem.id !== item.id),
      });

      toast.success("Item removed from cart");
      setLoading(false);
    } catch (error) {
      toast.error("Error removing item from cart: " + error.message);
      setLoading(false)
    }
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        isItemInCart,
        removeItemFromCart,
        reduceProductQuantityFromFirebase,
        getCartTotalRaw,
        addCartItemsFromFirebase,
        loading,
        removeCartItemsFromFirebase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
