import React, { useState } from "react";
import { AccountHeader } from "../../components/account/AccountHeader";
import Pagination from "../../components/pagination/Pagination";
import Products from "../../components/admin/Products";

const AdminProducts = () => {
  const [active, setactive] = useState(0);

  return (
    <div className="flex flex-col gap-5 p-6 overflow-auto">
      <AccountHeader heading="Products" text="" className="" />

      <div className="p-5 rounded-md bg-white gap-5 flex flex-col">
        <Products />
      </div>

      {/**forward back buttons */}

      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default AdminProducts;
