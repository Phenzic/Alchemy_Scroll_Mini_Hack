import { useState } from "react";
import "./App.css";
import { productData } from "./utils/testData";
import ProductCard from "./components/ProductCard";
import {
  BsApple,
  BsArrowRight,
  BsBalloon,
  BsHospital,
  BsTv,
  BsWatch,
} from "react-icons/bs";
import {
  TbBrandAirtable,
  TbDeviceGamepad,
  TbDeviceGamepad2,
  TbHanger,
} from "react-icons/tb";
import { CiApple, CiDumbbell } from "react-icons/ci";
import CategoriesCard from "./components/CategoriesCard";
import { Link } from "react-router-dom";

function App() {

  const [screenSizes, setscreenSizes] = useState({tablet:0,phone:0,laptop:0})

  if( window.innerWidth>=320 && window.innerWidth<=500){
    console.log("Mobile Phone")
  }else if(window.innerWidth>=501 && window.innerWidth<=1025){
    console.log("Ipadss")
  }else if(window.innerWidth>=1200){
    console.log("Lapyyoop")
  }else{
    console.log("other Screens")
  }
  // console.log(window.innerWidth)
  const categories = [
    {
      category: "Fashion",
      icon: <TbHanger size={30} />,
    },
    {
      category: "Furniture",
      icon: <TbBrandAirtable size={30} />,
    },
    {
      category: "Electronics",
      icon: <BsTv size={30} />,
    },
    {
      category: "Gaming",
      icon: <TbDeviceGamepad2 size={30} />,
    },
    {
      category: "Sports",
      icon: <CiDumbbell size={30} />,
    },
    {
      category: "SuperMarket",
      icon: <CiApple size={30} />,
    },
  ];
  return (
    <section className="p-4 py-10">
      {/* Banners */}
      <div className="grid grid-cols-[70%_30%] max-lg:grid-cols-2 grid-rows-2 h-[450px] w-full gap-5 max-md:h-[300px] max-md:gap-2">
        <img
          src="https://hds.hel.fi/images/foundation/visual-assets/placeholders/image-l@3x.png"
          alt=""
          className="col-span-1 rounded-xl row-span-2 max-lg:col-span-2 max-lg:row-span-1 h-full object-cover w-full bg-black/10"
        />
        <img
          src="https://hds.hel.fi/images/foundation/visual-assets/placeholders/image-l@3x.png"
          alt=""
          className="h-full rounded-xl object-cover w-full bg-black/10"
        />
        <img
          src="https://hds.hel.fi/images/foundation/visual-assets/placeholders/image-l@3x.png"
          alt=""
          className="h-full rounded-xl object-cover w-full bg-black/10"
        />
      </div>

      {/* New Arrivals */}
      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
          <Link className="text-[#086047]  flex items-center gap-2" to={""}>
            <p className=" font-semibold">View More</p>
            <BsArrowRight />
          </Link>
        </div>
        <div className="mt-6 flex flex-nowrap overflow-auto gap-x-6 gap-y-10  xl:gap-x-6 rounded-lg">
          {productData.map((product) => (
            <ProductCard
              id={product.id}
              isNew={true}
              title={product.title}
              key={product.id}
              image={product.image}
              category={product.category}
              price={product.price}
            />
          ))}
        </div>
      </div>

      {/* Best Sellers Products */}
      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Best Sellers</h2>
          <Link className="text-[#086047]  flex items-center gap-2" to={""}>
            <p className=" font-semibold">View More</p>
            <BsArrowRight />
          </Link>
        </div>
        <div className="mt-6 flex flex-nowrap overflow-auto gap-x-6 gap-y-10 xl:gap-x-6 rounded-lg">
          {productData.slice(10).map((product) => (
            <ProductCard
              id={product.id}
              title={product.title}
              key={product.id}
              image={product.image}
              category={product.category}
              price={product.price}
            />
          ))}
        </div>
      </div>

      {/* Shop By Categories */}
      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Shop by Categories
          </h2>
          <Link className="text-[#086047]  flex items-center gap-2" to={""}>
            <p className=" font-semibold">More Categories</p>
            <BsArrowRight />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-6 max-lg:flex max-lg:flex-nowrap max-lg:overflow-auto rounded-lg gap-5 items-center">
          {categories.map((category, index) => (
            <CategoriesCard
              key={index}
              icon={category.icon}
              category={category.category}
            />
          ))}
        </div>
      </div>

      {/* Year product */}
      <div className="mt-16">
        <div
          className="w-full h-80 mb-20 rounded-lg overflow-hidden relative before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-l
            before:from-[#086047]
            before:to-[#08604750]
            before:opacity-75
            before:z-[1]"
        >
          <img
            className="w-[40%] h-full object-cover hidden md:inline-block object-top pt-5"
            src={
              "https://www.pngall.com/wp-content/uploads/14/Hoodie-Background-PNG.png"
            }
          />
          <div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-5 md:px-0 top-0 right-0 flex flex-col items-start gap-6 max-md:gap-2 justify-center z-[2] text-white">
            <h1 className="text-3xl max-md:text-lg font-bold text-primeColor">
              Product of The year
            </h1>
            <p className="text-base max-md:text-sm font-normal max-w-[600px] mr-4 max-md:mb-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
              cupiditate modi amet! Facilis, aperiam quaerat.
            </p>
            <Link className="p-4 px-10 rounded-md font-semibold bg-[#086047] text-white">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Special Offers Products */}
      <div className="mt-16 mb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Special Offers</h2>
          <Link className="text-[#086047]  flex items-center gap-2" to={""}>
            <p className=" font-semibold">View More</p>
            <BsArrowRight />
          </Link>
        </div>
        <div className="mt-6 flex flex-nowrap overflow-auto gap-x-6 gap-y-10 xl:gap-x-6 rounded-lg">
          {productData.slice(10).map((product) => (
            <ProductCard
              title={product.title}
              key={product.id}
              id={product.id}
              image={product.image}
              category={product.category}
              price={product.price}
              isSpecialOffer={true}
              slashedPrice="500"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
