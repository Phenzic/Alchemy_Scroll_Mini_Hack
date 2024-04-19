import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

const AuthRoot = () => {
  const { currentUser, userDetails } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == "/auth") {
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/login");
    } else {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="flex">
      <div className="w-[50%] max-lg:w-full lg:max-h-screen overflow-auto">
        <Outlet />
      </div>
      <div className="w-[50%] h-screen rounded-tl-[70px] overflow-hidden max-lg:hidden">
        <img
          className="w-full h-full object-cover"
          src="https://bafybeicppdthbgb3cmmhb2lqo63lyhh2zd7l6c2mcs2eaqbchwyirtyjo4.ipfs.w3s.link/WhatsApp Image 2024-04-01 at 23.22.47_ee6ea1a6.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default AuthRoot;
