import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { productData } from "../utils/testData";

const Product = () => {
  const [products] = useState(productData.slice(0, 4));
  const [indexValue, setIndexValue] = useState(0);
  const { image } = products[indexValue];
  const [showCard, setShowCard] = useState(0);
  const [count, setCount] = useState(0);

  const decreaseCount = () => {
    count > 0 && setCount((prevCount) => prevCount - 1);
  };

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const tabs = ["Product Details", "Customer Reviews"];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <section className="py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 max-md:px-4 md:items-center">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-center h-[400px] bg-white rounded-xl border">
            <img
              className="rounded-3xl w-full h-full object-contain"
              src={image}
              alt=""
            />
          </div>
          <ul className="flex gap-3 items-center justify-center">
            {products.map((item, index) => (
              <li key={item.id} onClick={() => setIndexValue(index)}>
                <img
                  className="w-[130px] h-[130px] object-contain cursor-pointer bg-white border rounded-xl bottom-2 hover:opacity-40 hover:border-[#086047] transition duration-200 ease-in-out p-4"
                  src={item.image}
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full py-16 max-md:p-4">
          <p className="text-[#086047] font-bold mb-5">James Store</p>
          <h1 className="text-black text-4xl font-extrabold mb-6">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-slate-400 mb-6">
            These two low-profile sneakers are your perfect casual wear
            companion. Featuring a durable rubber outer sole, they will
            withstand everything the weather can offer
          </p>
          <div className="flex items-center justify-start gap-4">
            <h1 className="text-xl font-semibold">$125.00</h1>
            <h1 className="text-[#086047] p-1 px-3 text-sm rounded-lg bg-[#086047]/10 font-bold">
              50%
            </h1>
          </div>
          <h1 className="text-slate-400 text-lg font-semibold line-through mb-10">
            $250
          </h1>
          <div className="flex justify-start items-center gap-6">
            <div className=" flex gap-4 items-center justify-evenly bg-black/[3%] rounded-lg px-4 py-3 select-none">
              <FaMinus
                className="flex items-center justify-center text-lg font-semibold text-[#086047] cursor-pointer"
                onClick={decreaseCount}
              />
              <p className="mx-4 w-3 text-black-50 font-semibold">{count}</p>
              <FaPlus
                className="flex items-center justify-center text-[#086047] text-lg font-semibold cursor-pointer"
                onClick={increaseCount}
              />
            </div>
            <div>
              <button className=" bg-[#086047] hover:bg-[#086047]/80 text-white py-3 px-6 rounded-lg flex items-center gap-3 font-semibold">
                <BsCartPlus />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 bg-white p-10 border rounded-xl">
        <div className="flex gap-10 items-center font-semibold border-b mb-10">
          {tabs.map((val, index) => {
            return (
              <p
                onClick={() => setSelectedTabIndex(index)}
                className={`select-none cursor-pointer pb-2 border-b-[3px]  ${
                  selectedTabIndex == index
                    ? "border-b-[#086047] text-[#086047]"
                    : "border-b-transparent"
                }`}
                key={index}
              >
                {val}
              </p>
            );
          })}
        </div>
        <div>
          <p>
            Dear Customer: To avoid choosing the wrong size, please read the
            size label carefully. Always pick a bigger size as its Asian sizes
            used. About Size: If your US standard size is L, it is recommended
            to choose 2XL in our store; if your US standard size is XL, it is
            recommended to choose 3XL; Such as: United States (S) = China (L);
            United States (M) = China (XL); United States (L) = China (2XL);
            United States (XL) = China (3XL); United States (2XL) = China (4XL
            ); United States (3XL) = China (5XL); Features:
            Comfortable，Business，Very Cool，DurableOccasions:
            Sports、Casual、Office、Outdoor、Dating、Everyday、Shopping.Kindly
            include a working and active phone number while ordering for easy
            and fast delivery.Have you been searching for a Store with the best
            creative, inspirational & soul lifting fashion outfit & shirt
            designs? Just stop by at Berrykey-sea-codx monthly.The concept is
            designed to suit the very desire of having most of our everyday
            motivations in a simple, handy, convenient, comfortable and easy to
            handle wear. It's capable of bringing out a lot of vibe infact,
            all-in-one. It does well under any climatic condition and can be
            taken to any occasion serving the very purpose for which it is
            needed. It's smart design and quality makes it top-notch, bringing
            it to a realm of trend and class that is going to be up there for
            the long run. The design is to suit the very desire of having most
            of our rudimentary everyday on-the-go items in a simple, handy,
            convenient, comfortable and easy to handle outfit.Kindly include a
            working and active phone number while ordering for easy and fast
            delivery. Tips1: If you follow the fashion trend, please FOLLOW our
            shop.Tips2: If you want to enjoy 50% or higher discount shopping,
            please FOLLOW our shop.Tips3: If you are looking for high-quality
            and inexpensive products, please FOLLOW our shop.Tips: Measurements
            are the maximum size,please allow 0.5-1cm tolerance. Compare the
            chart size before ordering.Please help me to light up 5 stars when
            you receive the goods.I will make effort to offer more good items
            for you.Please share my store to your friends if you like the
            products.There maybe a very little chromatic aberration between the
            picture and the real picture,Because the different camera angles and
            lighting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Product;
