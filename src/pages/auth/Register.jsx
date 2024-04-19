import React, { useContext, useEffect, useState } from "react";
import AuthHeading from "../../components/auth/auth_heading";
import { Tab } from "@headlessui/react";
import UserRegister from "../../components/auth/UserRegister";
import SellerRegister from "../../components/auth/SellerRegister";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Register = () => {
  const [registerMode, setRegisterMode] = useState(["Buyer", "Seller"]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthHeading text={"Create an account"} />
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl border bg-black/[5%] p-1 sm:mx-auto sm:w-full sm:max-w-sm mt-5">
            {registerMode.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-1.5 text-sm font-medium leading-5 outline-none",
                    "",
                    selected
                      ? "bg-white text-[#086047] shadow"
                      : "text-[#086047] hover:bg-white/[0.12] "
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <UserRegister />
            </Tab.Panel>
            <Tab.Panel>
              <SellerRegister />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};
