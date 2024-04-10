import { AddAccountInfo } from "../components/account/AddAccountInfo";
import { AddDeliveryAddress } from "../components/account/AddDeliveryAddress";
import { ProfileComponent } from "../components/account/ProfileComponent";
import Account from "../pages/Account";
import LikedItems from "../pages/account/LikedItems";
import Notification from "../pages/account/Notification";
import OrderHistory from "../pages/account/OrderHistory";
import { Profile } from "../pages/account/Profile";

export const accountRoute = {
  path: "account",
  element: <Account />,
  children: [
    {
      path: "",
      element: <ProfileComponent />,
    },
    {
      path: "profile",
      element: <Profile />,
      children: [
        {
          path: "",
          element: <ProfileComponent />,
        },
        {
          path: "edit-profile",
          element: <AddAccountInfo />,
        },
        {
          path: "add-new-address",
          element: <AddDeliveryAddress />,
        },
      ],
    },
    {
      path: "orders",
      element: <OrderHistory />,
    },
    {
      path: "liked-items",
      element: <LikedItems />,
    },
    {
      path: "notifications",
      element: <Notification />,
    },
  ],
};
