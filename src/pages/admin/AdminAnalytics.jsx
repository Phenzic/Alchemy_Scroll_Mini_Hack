import React from "react";
import BarChat from "../../components/charts/BarChat";
import { PieChat } from "../../components/charts/PieChat";
import AdminOrders from "./AdminOrders";
import { AccountHeader } from "../../components/account/AccountHeader";

const AdminAnalytics = () => {
  return (
    <div className="flex flex-col gap-5 p-5 overflow-auto">
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        <AdminInfo />
        <AdminInfo />
        <AdminInfo />
      </div>

      <div className="flex gap-10 overflow-hidden justify-between bg-white p-4 py-6 rounded-2xl w-[100%] h-fit border overflow-x-auto max-lg:flex-col max-lg:items-center">
        <BarChat />
        <PieChat />
      </div>

      <div className="p-5 bg-white rounded-2xl border">
        <AccountHeader
          heading="Top selling products"
          text=""
          className="mb-5"
        />
      </div>

      <div className="p-5 bg-white rounded-2xl border">
        <AdminOrders />
      </div>
    </div>
  );

  function AdminInfo() {
    return (
      <div className="p-6 flex-col  bg-white w-full rounded-2xl border">
        <p className="text-neutral-400 text-lg font-normal mb-5">Total sales</p>

        <h1 className="text-neutral-700 text-[28px] font-medium mb-3">
          $ 185,700
        </h1>

        <p className="text-neutral-700 text-sm font-normal leading-tight inline-flex gap-2 items-center">
          <span className="px-3 py-1 text-[#0d0d0d] bg-[#305c4523] rounded-3xl font-medium">
            4.8%
          </span>
          from yesterday
        </p>
      </div>
    );
  }
};

export default AdminAnalytics;
