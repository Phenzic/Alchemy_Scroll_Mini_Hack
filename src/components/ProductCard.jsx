import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({
  id,
  image,
  name,
  category,
  price,
  isNew = false,
  isSpecialOffer = false,
  slashedPrice = "",
  discount = "",
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      onClick={() => navigate(`/product/${id}`)}
      className="group cursor-pointer relative border rounded-lg hover:border-[#086047] max-lg:min-w-[200px] h-fit overflow-hidden"
    >
      {isNew && (
        <div className="uppercase bg-[#086047] text-white rounded-md absolute top-3 left-3 text-[13px] font-semibold p-1.5 px-3 shadow-lg z-[5]">
          <p>New</p>
        </div>
      )}
      {isSpecialOffer && (
        <div className="uppercase bg-[#fef3e9] text-[#f68b1e] rounded-md absolute top-3 right-3 text-[13px] font-semibold p-1.5 px-3 z-[5] border border-[#f68b1e]">
          <p>-{discount}%</p>
        </div>
      )}
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-black/10 lg:aspect-none group-hover:opacity-75 max-h-60 min-h-60 max-lg:min-h-[150px] max-lg:max-h-[150px] h-full">
        <img
          src={image}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="flex justify-between max-lg:flex-col p-5 bg-black/[5%]">
        <div className="w-full">
          <h3 className="text-sm text-gray-700 line-clamp-1 max-w-[80%] max-lg:mb-1">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </h3>
          <p className="mt-1 text-sm max-lg:hidden text-gray-500 capitalize line-clamp-1">
            {category}
          </p>
        </div>
        <p
          className={`text-md relative font-semibold text-gray-900 ${
            isSpecialOffer && "lg:line-through lg:text-sm lg:text-gray-900/40"
          }`}
        >
          {isSpecialOffer ? (
            <span className="max-lg:hidden">${price} </span>
          ) : (
            <span className="text-[#086047]">${price} </span>
          )}
          {isSpecialOffer && (
            <span className="lg:hidden text-[#086047]">${slashedPrice} </span>
          )}
          {isSpecialOffer && (
            <span className="absolute max-lg:hidden top-5 left-0 text-[#086047]">
              ${slashedPrice}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
