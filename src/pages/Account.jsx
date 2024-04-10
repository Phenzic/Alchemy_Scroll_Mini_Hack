import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import OrderHistory from "./account/OrderHistory";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div>
      <p className="my-5">Home {">"} Account</p>

      <div className="flex gap-5 min-h-screen">
        <Sidebar />

        <Outlet />

        {/** <AddAccountInfo /> */}
        {/**<AddDeliveryAddress />*/}
      </div>
    </div>
  );
};

export default Account;
