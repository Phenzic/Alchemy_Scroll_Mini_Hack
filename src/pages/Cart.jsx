import {
  BsArrowRight,
  BsCheck,
  BsClock,
  BsQuestionCircle,
  BsX,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const products = [
  //   {
  //     id: 1,
  //     name: "Basic Tee",
  //     href: "#",
  //     price: "32.00",
  //     color: "Sienna",
  //     inStock: true,
  //     size: "Large",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
  //     imageAlt: "Front of men's Basic Tee in sienna.",
  //   },
  //   {
  //     id: 2,
  //     name: "Basic Tee",
  //     href: "#",
  //     price: "32.00",
  //     color: "Black",
  //     inStock: false,
  //     leadTime: "3–4 weeks",
  //     size: "Large",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //   },
  //   {
  //     id: 3,
  //     name: "Nomad Tumbler",
  //     href: "#",
  //     price: "35.00",
  //     color: "White",
  //     inStock: true,
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
  //     imageAlt: "Insulated bottle with white base and black snap lid.",
  //   },
];

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    removeItemFromCart,
    getCartTotal,
  } = useCart();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  return (
    <div className=" py-10 max-md:py-0">
      <main className="mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8 rounded-lg">
        <h1 className="text-[26px] font-bold max-lg:text-2xl mb-5">
          Shopping Cart
        </h1>
        <div className="mt-0 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            {cartItems.length < 1 ? (
              <div className="w-full h-full flex flex-col items-center gap-4">
                <img
                  className="w-[250px] h-[250px]"
                  src="https://bafybeidytuhyhklupxp5pxqvtuzy4er65nf4nirkauaeegyi4wecgppzcm.ipfs.w3s.link/Empty-cuate.svg"
                  alt=""
                />
                <div className="flex items-center flex-col gap-1">
                  <h1 className="font-bold text-lg">
                    You don't have any items in your cart
                  </h1>
                  <Link
                    to={"/"}
                    className="flex items-center gap-2 text-[#086047] text-sm font-semibold"
                  >
                    <span>Start Shopping</span>
                    <BsArrowRight />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((product, productIdx) => (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0 border rounded-lg">
                        <img
                          src={product.image}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={product.href}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.title}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">
                                {product.category}
                              </p>
                              {/* {product.size ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                  {product.size}
                                </p>
                              ) : null} */}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              ${product.price}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label
                              htmlFor={`quantity-${productIdx}`}
                              className="sr-only"
                            >
                              Quantity, {product.quantity}
                            </label>
                            <div className=" flex gap-4 items-center justify-evenly bg-black/[3%] rounded-lg px-3 py-2 select-none text-sm w-fit">
                              <FaMinus
                                className="flex items-center justify-center text-sm font-semibold text-[#086047] cursor-pointer"
                                onClick={() =>
                                  product.quantity > 1
                                    ? removeFromCart(product)
                                    : {}
                                }
                              />
                              <p className="mx-2 w-3 text-black-50 font-semibold">
                                {product.quantity}
                              </p>
                              <FaPlus
                                className="flex items-center justify-center text-[#086047] text-sm font-semibold cursor-pointer"
                                onClick={() => addToCart(product)}
                              />
                            </div>

                            <div className="absolute right-0 top-0">
                              <button
                                onClick={() => removeItemFromCart(product)}
                                type="button"
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <BsX className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          {product.inStock ? (
                            <BsCheck
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <BsClock
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          )}

                          <span>
                            {product.inStock
                              ? "In stock"
                              : `Ships in ${product.leadTime}`}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 mt-10 lg:p-8 sticky max-lg:relative"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${getCartTotal()}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <BsQuestionCircle className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <BsQuestionCircle className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${getCartTotal()}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={()=> currentUser ? navigate("/checkout") : toast.error("Please login to continue checkout")}
                disabled={cartItems.length < 1}
                className="w-full rounded-md border border-transparent bg-[#086047] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#086047] focus:outline-none focus:ring-2 focus:ring-[#086047] focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Cart;
