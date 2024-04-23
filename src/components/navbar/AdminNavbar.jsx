import React, { useEffect, useState } from "react";
import {
  BsAlarm,
  BsCart3,
  BsChevronDown,
  BsPerson,
  BsQuestionCircle,
  BsSearch,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { CgNotifications } from "react-icons/cg";
import { Cross as Hamburger } from "hamburger-react";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router";

const AdminNavbar = ({ navTrigger, handleNavbarTrigger }) => {
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [showCategoriesNav, setShowCategoriesNav] = useState(true);
  useEffect(() => {
    if (pathname == "/" || pathname.includes("categories")) {
      setShowCategoriesNav(true);
    } else {
      setShowCategoriesNav(false);
    }
  }, [pathname]);

  const navigate = useNavigate();

  return (
    <>
      <div className="border-b sticky top-0 z-[90] border-b-black/20 bg-white p-3">
        <div  className="md:hidden flex items-center gap-3">
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
        <div className="w-full flex items-center gap-10 max-md:hidden px-3">
          <div className="border border-[#086047] bg-[#086047] overflow-hidden flex rounded-md w-full">
            <input
              type="text"
              placeholder="Search for anything"
              className="p-3 px-4 text-sm w-full outline-none"
            />
            <div className="flex items-center justify-center px-5 text-lg cursor-pointer hover:opacity-70">
              <BsSearch className="text-white h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
