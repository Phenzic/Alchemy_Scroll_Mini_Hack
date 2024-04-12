import React, { useState } from "react";
import BarChat from "../../components/charts/BarChat";
import { PieChat } from "../../components/charts/PieChat";
import Orders from "../../components/admin/Orders";
import { AccountHeader } from "../../components/account/AccountHeader";
import { MenuButton } from "../../components/Buttons/MenuButton";
import { AccountButtonFilled } from "../../components/Buttons/AccountButtons";
import Pagination from "../../components/pagination/Pagination";
import Products from "../../components/admin/Products";

const options = [
  {
    text: "All",
    url: "/all",
  },
  {
    text: "Confirmed",
    url: "/confirmed",
  },
  {
    text: "Processing",
    url: "/processing",
  },
  {
    text: "Picked",
    url: "/picked",
  },
  {
    text: "Shipping",
    url: "/shipping",
  },
  {
    text: "Shipped",
    url: "/shipped",
  },
  {
    text: "Cancelled",
    url: "/cancelled",
  },
];

const AdminProducts = () => {
  const [active, setactive] = useState(0);

  return (
    <div className="flex flex-col gap-5 p-6 overflow-auto">
      <AccountHeader heading="Products" text="" className="" />

      <div className="p-5 rounded-md bg-white gap-5 flex flex-col">
        {/* <div className="flex justify-start gap-5 border-b border-b-black/10">
          {options?.map((_, i) => (
            <p
              className={`${
                active === i
                  ? "text-[#305C45] border-b-[#305C45]"
                  : "text-black/40"
              } px-1 pb-3 border-b-transparent 
              hover:text-[#305C45] text-sm  border-b-4 rounded-b-md cursor-pointer`}
              key={_.text}
              onClick={() => setactive(i)}
            >
              {_.text}
            </p>
          ))}
        </div> */}

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
