import React from "react";
import { AccountHeader } from "../../components/account/AccountHeader";
import Pagination from "../../components/pagination/Pagination";
import Customers from "../../components/admin/Customers";
import CustomerDeliveries from "../../components/drivers/CustomerDeliveries";

const RideHistory = () => {
  return (
    <div className="flex flex-col gap-5 p-6 overflow-auto">
      <AccountHeader heading="Active Rides" text="" className="" />

      <div className="p-5 rounded-md bg-white gap-5 flex flex-col">
        <CustomerDeliveries />
      </div>

      <AccountHeader heading="Delivery History" text="" className="" />

      <div className="p-5 rounded-md bg-white gap-5 flex flex-col">
        <CustomerDeliveries />
      </div>

      {/**forward back buttons */}

      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default RideHistory;
