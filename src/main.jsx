import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import SellerRootLayout from "./pages/sellerRoot/SellerRootLayout";
import AdminRoot from "./wrappers/AdminRoot";
import UserRoot from "./wrappers/UserRoot";
import { Login } from "./pages/auth/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Register } from "./pages/auth/Register";
import AuthRoot from "./wrappers/AuthRoot";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import UserProvider from "./context/UserContext";
import AdminProvider from "./context/AdminContext";
import SellerProvider from "./context/SellerContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/sellerRoot/seller/Dashboard";
import Products from "./pages/sellerRoot/seller/Products";
import Wallet from "./pages/sellerRoot/seller/Wallet";
import Orders from "./pages/sellerRoot/seller/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "categories/:id",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoot />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/seller",
    element: <SellerRootLayout/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "",
        element: <></>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <UserProvider>
      <AdminProvider>
        <SellerProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </SellerProvider>
      </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);
