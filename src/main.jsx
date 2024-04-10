import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import SellerRoot from "./wrappers/SellerRoot";
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
import Account from "./pages/Account";
import { Profile } from "./pages/account/Profile";
import OrderHistory from "./pages/account/OrderHistory";

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
        path: "account",
        element: <Account />,
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "orders",
            element: <OrderHistory />,
          },
          {
            path: "liked-items",
            element: <>liked items</>,
          },
          {
            path: "notifications",
            element: <>notifications</>,
          },
        ],
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
    element: <SellerRoot />,
    children: [
      {
        path: "",
        element: <></>,
      },
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
