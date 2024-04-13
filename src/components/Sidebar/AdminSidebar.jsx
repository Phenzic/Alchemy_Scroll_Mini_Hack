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
import { CiDeliveryTruck, CiLogout } from "react-icons/ci";
import logo from "../../assets/logo.png";
import { MenuButton } from "../Buttons/MenuButton";
import {
  BsBag,
  BsBell,
  BsCart3,
  BsHeart,
  BsHouse,
  BsPeople,
  BsShop,
  BsShopWindow,
} from "react-icons/bs";
// My Profile Orders Liked items Notifications Log out

const menu = [
  {
    icon: <BsHouse className="text-base" />,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <BsCart3 className="text-base" />,
    title: "Analytics",
    link: "/analytics",
  },
  {
    icon: <BsHeart className="text-base" />,
    title: "Orders",
    link: "/orders",
  },
  {
    icon: <BsBag className="text-base" />,
    title: "Products",
    link: "/products",
  },
  {
    icon: <BsPeople className="text-base" />,
    title: "Customers",
    link: "/customers",
  },
  {
    icon: <BsShop className="text-base" />,
    title: "Vendors",
    link: "/vendors",
  },
  {
    icon: <CiDeliveryTruck className="text-xl" />,
    title: "Delivery",
    link: "/delivery",
  },
  {
    icon: <BsShopWindow className="text-base" />,
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
      <aside
        className="md:left-0 md:block hidden  md:top-0 md:bottom-0 
        md:overflow-y-auto  md:flex-nowrap md:overflow-hidden border-r 
      bg-white  items-center justify-between w-[250px] min-w-[250px] z-10
        pb-20 fixed top-0"
      >
        {showLogo && (
          <div className="p-10 px-11">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="mx-auto" />
            </Link>
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
      </aside>
    </>
  );
}
