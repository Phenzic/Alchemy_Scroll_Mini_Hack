import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import OrderHistory from "./account/OrderHistory";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { BsArrowRight } from "react-icons/bs";

const Account = () => {
  const { currentUser } = useUser();
  return (
    <div>
      {currentUser && (
        <p className="my-5 [word-spacing:6px] px-5">Home {">"} Account</p>
      )}

      <div className="flex gap-5 min-h-[80vh] max-md:min-h-full">
        {currentUser && <Sidebar />}
        {currentUser ? (
          <Outlet />
        ) : (
          <div className="w-full h-full flex flex-col items-center gap-4 py-24 text-center">
            <div className="w-full h-full flex flex-col items-center gap-4 p-5">
              <img
                className="w-[280px] h-[280px]"
                src="https://bafybeidl33fbxkd77oaj3d2hwzwctbf7lhlb242kuuldob2vimlem37c24.ipfs.w3s.link/Login-cuate.svg"
                alt=""
              />
              <div className="flex items-center flex-col gap-1">
                <h1 className="font-bold text-xl">
                  You have to be logged in to view your account
                </h1>
                <Link
                  to={"/auth/login"}
                  className="flex items-center gap-2 text-[#086047] text-base font-semibold"
                >
                  <span>Sign in to your account</span>
                  <BsArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
        {/** <AddAccountInfo /> */}
        {/**<AddDeliveryAddress />*/}
      </div>
    </div>
  );
};

export default Account;
