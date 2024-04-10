/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaHome,
  FaPersonBooth,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
// My Profile Orders Liked items Notifications Log out

const menu = [
  {
    icon: <FaHome className="text-xl" />,
    title: "My Profile",
    link: "/profile",
  },
  {
    icon: <FaShoppingCart className="text-xl" />,
    title: "Orders",
    link: "/orders",
  },
  {
    icon: <FaHeart className="text-xl" />,
    title: "Liked items",
    link: "/liked-items",
  },
  {
    icon: <IoIosNotifications className="text-xl" />,
    title: "Notifications",
    link: "/notifications",
  },
  {
    icon: <CiLogout className="text-xl" />,
    title: "Log out",
    link: "/logout",
  },
];

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [active, setactive] = useState(0);
  return (
    <>
      <nav className="md:left-0 md:block hidden  md:top-0 md:bottom-0 md:overflow-y-auto  md:flex-nowrap md:overflow-hidden shadow-xl bg-white  items-center justify-between relative md:w-[21.125rem] z-10 ">
        {menu.map((item, index) => (
          <Link to={`/account${item.link}`} key={index}>
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

function MenuButton({
  active,
  icon = <FaPersonBooth className="text-xl " />,
  title = "My Profile",
  setactive = () => {},
  index = 0,
}) {
  return (
    <div
      className={`w-full h-20 justify-start items-start inline-flex border-l-[.6rem] ${
        active
          ? "border-l-[#305C45] bg-zinc-100 text-neutral-700"
          : "border-l-transparent bg-white text-neutral-500"
      }  rounded-2xl cursor-pointer hover:text-neutral-800`}
      onClick={() => setactive(index)}
    >
      <div className="w-[354px] h-20 pl-[30px]  py-[15px]   justify-start items-center gap-2.5 flex ">
        {icon}
        <div className=" text-lg font-medium font-['League Spartan']">
          {title}
        </div>
      </div>
    </div>
  );
}
