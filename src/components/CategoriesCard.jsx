import React from "react";

const CategoriesCard = ({ icon, category }) => {
  return (
    <div className="flex flex-col items-center gap-3 text-[#086047] font-semibold bg-black/[5%] p-6 px-7 text-lg w-full rounded-lg cursor-pointer hover:text-white hover:bg-[#086047] max-lg:max-w-[150px]">
      {icon}
      <h1>{category}</h1>
    </div>
  );
};

export default CategoriesCard;
