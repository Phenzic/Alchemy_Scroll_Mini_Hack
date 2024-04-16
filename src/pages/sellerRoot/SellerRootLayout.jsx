import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import logo from "../../assets/logo.png";
import { Cross as Hamburger } from "hamburger-react";

const SellerRootLayout = () => {
  const location = useLocation();
  const current_page = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [navTrigger, setNavTrigger] = useState(false);

  const handleNavbarTrigger = function () {
    setNavTrigger(!navTrigger);
  };

  useEffect(() => {
    if (location.pathname == "/seller") {
      navigate("dashboard");
    }
  }, [current_page]);

  return (
    <React.Fragment>
      <div className="border-b p-3 bg-white sticky top-0 z-10 md:hidden">
        <div className="flex items-center gap-2">
          <div>
            <Hamburger
              rounded
              size={24}
              toggled={navTrigger}
              toggle={handleNavbarTrigger}
            />
          </div>
          <Link to={"/"}>
            <img className="w-[170px] max-md:w-[150px]" src={logo} alt="" />
          </Link>
        </div>
      </div>
      <div className="flex bg-[#fbfbfb] relative">
        <SideBar toggle={handleNavbarTrigger} trigger={navTrigger} />

        <main className="w-full max-md:ml-0">
          <div className="p-5 max-md:p-3">
            <header className=" items-center flex justify-between px-3 py-5 max-md:pt-3">
              <p className=" md:text-2xl font-medium font-sans text-slate-700 capitalize">
                {current_page}
              </p>
            </header>
            <Outlet />
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default SellerRootLayout;
