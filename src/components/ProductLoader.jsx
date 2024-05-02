import React from "react";

const ProductLoader = () => {
  return (
    <div className="w-full max-lg:min-w-[300px] rounded-md h-[250px] animate-pulse bg-black/[7%] flex items-end justify-center overflow-hidden">
      <div className="w-full bg-black/[7%] h-[90px] p-4">
        <div className="flex items-center justify-between">
          <div className="w-[50%] animate-pulse bg-black/[7%] h-[20px] rounded-md"></div>
          <div className="w-[30%] animate-pulse bg-black/[7%] h-[20px] rounded-md"></div>
        </div>
        <div className="w-[25%] animate-pulse bg-black/[7%] h-[20px] rounded-md mt-3"></div>
      </div>
    </div>
  );
};

export default ProductLoader;
