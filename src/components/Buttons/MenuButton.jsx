/* eslint-disable react/prop-types */
import { FaPersonBooth } from "react-icons/fa";

export function MenuButton({
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
