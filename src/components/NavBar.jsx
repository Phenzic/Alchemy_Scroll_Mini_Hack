import React, { useState } from "react";
import {
  BsCart3,
  BsChevronDown,
  BsPerson,
  BsQuestionCircle,
  BsSearch,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Cross as Hamburger } from "hamburger-react";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([
    "Furnitures",
    "Phones",
    "Laptops",
    "Fashion",
    "Baby and Toys",
    "Gaming",
    "Sports & Fitness",
    "Home & Office",
    "Health & Beauty",
    "SuperMarkets",
  ]);
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
          <div className="w-[85%] flex items-center gap-10 max-md:hidden">
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
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-black/[5%] rounded-md p-2 px-3">
                <BsQuestionCircle />
                <p>Help</p>
                <BsChevronDown />
              </div>
              <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-black/[5%] rounded-md p-2 px-3">
                <BsPerson size={16} />
                <p>Account</p>
                <BsChevronDown />
              </div>
              <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-black/[5%] rounded-md p-2 px-3">
                <BsCart3 />
                <p>Cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-b-black/20 bg-white max-[1100px]:hidden">
        <div className="flex items-center justify-between p-4 py-4 max-w-[1280px] mx-auto text-[13px] text-[#086047] gap-4 ">
          <div className="flex items-center gap-2">
            <div>
              <CgMenuLeftAlt size={22} />
            </div>
            All Categories
          </div>
          {allCategories.map((category, index) => {
            return (
              <Link
                href=""
                key={index}
                className=" text-[#086047] transition-all duration-500 ease-in-out"
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;
