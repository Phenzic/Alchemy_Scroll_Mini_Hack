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
import { accountRoute } from "./routes/accountRoute";
import Dashboard from "./pages/seller/Dashboard";
import Products from "./pages/seller/Products";
import Wallet from "./pages/seller/Wallet";
import Orders from "./pages/seller/Orders";
import AdminHome from "./pages/admin/AdminHome";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminDelivery from "./pages/admin/AdminDelivery";
import AdminStore from "./pages/admin/AdminStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "",
        element: <App />,
      },
      accountRoute,
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
    ],
  },
  {
    path: "/admin/*",
    element: <AdminRoot />,
    children: [
      {
        path: "",
        element: <AdminHome />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "analytics",
            element: <AdminAnalytics />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "customers",
            element: <AdminCustomers />,
          },
          {
            path: "vendors",
            element: <AdminVendors />,
          },
          {
            path: "delivery",
            element: <AdminDelivery />,
          },
          {
            path: "my-store",
            element: <AdminStore />,
          },
        ],
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
