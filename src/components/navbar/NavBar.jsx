import React, { Fragment, useEffect, useState } from "react";
import {
  BsCart3,
  BsChevronDown,
  BsPerson,
  BsQuestionCircle,
  BsSearch,
  BsX,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Cross as Hamburger } from "hamburger-react";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useUser } from "../../context/UserContext";

const NavBar = () => {
  const { currentUser } = useUser();
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
  const { pathname } = useLocation();
  const [showCategoriesNav, setShowCategoriesNav] = useState(true);
  const isMobile = useMediaQuery("min-width: 768px)");
  useEffect(() => {
    if (pathname == "/" || pathname.includes("categories")) {
      setShowCategoriesNav(true);
    } else {
      setShowCategoriesNav(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

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

              {currentUser ? (
                <div
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-black/[5%] rounded-md p-2 px-3"
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  <BsPerson size={16} />
                  <p>Account</p>
                </div>
              ) : (
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex items-center gap-2 text-sm cursor-pointer hover:bg-black/[5%] rounded-md p-2 px-3">
                    <BsPerson size={16} />
                    <p>Account</p>
                    <BsChevronDown />
                  </Menu.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="px-2 py-2 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate("/auth/login")}
                              className={`${
                                active
                                  ? "bg-[#086047] text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                            >
                              Login
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate("/auth/register")}
                              className={`${
                                active
                                  ? "bg-[#086047] text-white"
                                  : "text-gray-900"
                              } group flex w-full mt-1 items-center rounded-md px-4 py-2 text-sm`}
                            >
                              Register
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
              <Link to={"/cart"}>
                <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-black/[5%] rounded-md p-2 px-3">
                  <BsCart3 />
                  <p>Cart</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          unmount={false}
          className="relative z-[99999999] lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-6 py-4">
                  <Link onClick={() => setOpen(false)} to={"/"}>
                    <img
                      className="w-[170px] max-md:w-[150px]"
                      src={logo}
                      alt=""
                    />
                  </Link>
                  <button
                    type="button"
                    className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <BsX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {showCategoriesNav && (
        <div className="border-b border-b-black/20 bg-white overflow-auto whitespace-nowrap">
          <div className="flex items-center justify-between p-4 py-4 max-w-[1280px] mx-auto text-[13px] text-[#086047] gap-4 ">
            {/* <div className="flex items-center gap-2">
              <div>
                <CgMenuLeftAlt size={22} />
              </div>
              All Categories
            </div> */}
            {allCategories.map((category, index) => {
              return (
                <Link
                  to={`/categories/${category.toLowerCase()}`}
                  key={index}
                  className=" text-[#086047] transition-all duration-500 ease-in-out"
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
