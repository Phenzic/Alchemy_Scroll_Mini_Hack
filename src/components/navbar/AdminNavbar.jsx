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

const AdminNavbar = () => {
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
      <div className="border-b sticky top-0 z-[90] border-b-black/20 bg-white">
        <div className="flex items-center justify-between p-4 py-5 sticky top-0 container mx-auto gap-10">
          <div className="w-[15%] max-md:w-fit flex items-center gap-2">
            <div className="md:hidden">
              <Hamburger rounded size={24} toggled={isOpen} toggle={setOpen} />
            </div>
            <Link to={"/"}>
              <img className="w-[170px] max-md:w-[150px]" src={logo} alt="" />
            </Link>
          </div>
          <div className="flex items-center gap-5 md:hidden">
            <BsPerson size={21} />
            <BsCart3 size={21} />
          </div>
          <div className="w-[75%] flex items-center gap-10 max-md:hidden">
            <div className="border border-[#086047] bg-[#086047] overflow-hidden flex rounded-md w-full">
              <input
                type="text"
                placeholder="Search for products, stores and categories"
                className="p-3 px-4 text-sm w-full outline-none"
              />
              <div className="flex items-center justify-center px-5 text-lg cursor-pointer hover:opacity-70">
                <BsSearch className="text-white h-full" />
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
