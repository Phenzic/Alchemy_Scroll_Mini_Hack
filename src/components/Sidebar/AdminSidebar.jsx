/*eslint-disable*/
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHeart,
  FaHome,
  FaPersonBooth,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import logo from "../../assets/logo.png";
import { MenuButton } from "../Buttons/MenuButton";
// My Profile Orders Liked items Notifications Log out

const menu = [
  {
    icon: <FaHome className="text-xl" />,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <FaShoppingCart className="text-xl" />,
    title: "Analytics",
    link: "/analytics",
  },
  {
    icon: <FaHeart className="text-xl" />,
    title: "Orders",
    link: "/orders",
  },
  {
    icon: <IoIosNotifications className="text-xl" />,
    title: "Products",
    link: "/products",
  },
  {
    icon: <CiLogout className="text-xl" />,
    title: "Customers",
    link: "/customers",
  },
  {
    icon: <CiLogout className="text-xl" />,
    title: "Vendors",
    link: "/vendors",
  },
  {
    icon: <CiLogout className="text-xl" />,
    title: "Delivery",
    link: "/delivery",
  },
  {
    icon: <CiLogout className="text-xl" />,
    title: "My store",
    link: "/my-store",
  },
];

export default function AdminSidebar({ showLogo = true }) {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = useLocation().pathname.split("/")[2];
  const [active, setactive] = useState(
    menu.findIndex((item) => item.link === `/${pathname}`) || 0
  );

  useLayoutEffect(() => {
    setactive(menu.findIndex((item) => item.link === `/${pathname}`));
  }, [pathname]);

  return (
    <>
      <nav
        className="md:left-0 md:block hidden  md:top-0 md:bottom-0 
        md:overflow-y-auto  md:flex-nowrap md:overflow-hidden shadow-xl 
      bg-white  items-center justify-between relative md:w-[21.125rem] z-10
        pb-20"
      >
        {showLogo && (
          <div className="p-8">
            <img src={logo} alt="logo" className="mx-auto" />
          </div>
        )}

        {menu.map((item, index) => (
          <Link
            to={`${
              "/auth/login" === item.link ? item.link : `/admin${item.link}`
            }`}
            key={index}
          >
            <MenuButton
              active={index === active}
              icon={item.icon}
              title={item.title}
              setactive={setactive}
              key={item.title}
              index={index}
            />
          </Link>
        ))}
      </nav>
    </>
  );
}
