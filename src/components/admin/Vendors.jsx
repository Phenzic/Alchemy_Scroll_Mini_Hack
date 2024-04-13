import React from "react";
import { useNavigate } from "react-router";

const Vendors = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-full grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-lg:grid-cols-1">
        {Array(10)
          .fill()
          .map((_, key) => {
            return (
              <div
                className="bg-white border cursor-pointer rounded-lg p-5 flex flex-col items-center"
                key={key}
              >
                <img
                  src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                  className="w-20 h-20 text-large object-cover rounded-full mb-2"
                />
                <h1 className="font-semibold">Pysavant Codes</h1>
                <p className="text-sm opacity-70">uwakblessing1@gmail.com</p>
                <button
                  onClick={() => navigate(`${key}`)}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#305c45] px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#305c45ce] focus:outline-none focus:ring-2 focus:ring-[#305c45b5] focus:ring-offset-2 sm:w-full sm:flex-grow-0 mt-5"
                >
                  View Vendor Details
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Vendors;