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
import { accountRoute } from "./routes/accountRoute";
import AdminHome from "./pages/admin/AdminHome";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminDelivery from "./pages/admin/AdminDelivery";
import AdminStore from "./pages/admin/AdminStore";
import Dashboard from "./pages/sellerRoot/seller/Dashboard";
import Products from "./pages/sellerRoot/seller/Products";
import Wallet from "./pages/sellerRoot/seller/Wallet";
import SellerOrder from "./pages/sellerRoot/seller/SellerOrder";
import Orders from "./pages/sellerRoot/seller/Orders";
import Order from "./pages/account/Order";
import Vendor from "./pages/admin/Vendor";
import Checkout from "./pages/Checkout";
import AdminWallet from "./pages/admin/AdminWallet";
import AddSellerProduct from "./pages/sellerRoot/seller/AddSellerProduct";
import SellerAddCard from "./pages/sellerRoot/seller/SellerAddCard";
import Profile from "./pages/sellerRoot/seller/Profile";
import EditProfile from "./pages/sellerRoot/seller/EditProfile";
import { NextUIProvider } from "@nextui-org/react";

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
      accountRoute,
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
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
    path: "/seller/*",
    element: <SellerRootLayout />,
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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "orders/:id",
        element: <SellerOrder />,
      },
      {
        path: "products/new-product",
        element: <AddSellerProduct />,
      },
      {
        path: "wallet/add-card",
        element: <SellerAddCard />,
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
            path: "wallet",
            element: <AdminWallet />,
          },
          {
            path: "orders/:id",
            element: <Order />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "products/:id",
            element: <Product isAdmin={true} />,
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
            path: "vendors/:id",
            element: <Vendor />,
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
            <NextUIProvider>
              <RouterProvider router={router} />
            </NextUIProvider>
          </CartProvider>
        </SellerProvider>
      </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);
