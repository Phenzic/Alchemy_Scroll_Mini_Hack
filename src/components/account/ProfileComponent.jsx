/* eslint-disable react/no-unescaped-entities */
import { useUser } from "../../context/UserContext";
import { AccountButtonOutline } from "../Buttons/AccountButtons";
import { AccountHeader } from "../account/AccountHeader";
import { Link, useNavigate } from "react-router-dom";
import DeliveryAddress from "./DeliveryAddress";
import { BsArrowRight } from "react-icons/bs";

export const ProfileComponent = () => {
  const navigate = useNavigate();
  const { userDetails, orders } = useUser();

  return (
    <div className="md-p-[3rem] p-4 text-[#313638] w-full gap-5 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
        <AccountHeader
          heading={`Hello, ${userDetails?.username}`}
          text={`${userDetails?.phoneNumber || ""} | ${userDetails?.email}`}
        />

        <div className="flex gap-5 items-center text-[#305C45] max-lg:flex-col max-lg:gap-2 max-md:justify-between max-md:flex-row max-md:items-center max-lg:items-end">
          <AccountButtonOutline
            text="Edit Profile"
            onClick={() => {
              navigate("/account/profile/edit-profile");
            }}
          />
          {userDetails?.userRole == "seller" && (
            <Link
              to={"/seller/dashboard"}
              className="font-bold flex items-center gap-2"
            >
              Seller's Panel <BsArrowRight />
            </Link>
          )}
        </div>
      </div>

      <div
        className="w-[50%] max-md:w-full h-[200px] relative bg-[#313638]/[3%] bg-opacity-95
        rounded-lg flex justify-start  
        items-center border"
      >
        <div
          className="w-full flex flex-col  items-start 
           p-2 px-10 justify-between gap-14"
        >
          <h1 className="text-neutral-700 text-[20px] md:text-[28px] font-normal ">
            Total Orders
          </h1>

          <p className="text-neutral-700 text-[28px] md:text-[28px] font-medium ">
            {orders.length}
          </p>
        </div>
      </div>

      <div className="">
        <h3 className="md:text-lg text-sm font-semibold border-b py-5 opacity-60">
          Delivery address
        </h3>

        <div className="flex flex-col gap-[3rem] my-[3rem] ">
          <DeliveryAddress />
        </div>

        <div className="flex justify-end py-3 border-t ">
          <AccountButtonOutline
            text="Add new address"
            onClick={() => {
              navigate("/account/profile/add-new-address");
            }}
            className="px-5"
          />
        </div>
      </div>
    </div>
  );
};
