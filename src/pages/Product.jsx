import React, { useEffect, useState } from "react";
import { BsCartPlus, BsChevronRight, BsStarFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { productData } from "../utils/testData";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { numberWithCommas } from "../utils/helper";
import { BeatLoader, ClipLoader } from "react-spinners";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = ({ isAdmin = false }) => {
  const { addToCart, isItemInCart, removeFromCart } = useCart();
  const [indexValue, setIndexValue] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const { id } = useParams();

  const fetchProduct = async () => {
    setLoadingProduct(true);
    const ref = await getDoc(doc(db, "products", id));
    if (ref.exists()) {
      setSelectedProduct({ id, ...ref.data() });
    }
    setLoadingProduct(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const tabs = ["Product Details", "Customer Reviews"];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
      { rating: 5, count: 1019 },
      { rating: 4, count: 162 },
      { rating: 3, count: 97 },
      { rating: 2, count: 199 },
      { rating: 1, count: 147 },
    ],
    featured: [
      {
        id: 1,
        rating: 5,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: "Emily Selman",
        avatarSrc:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
      },
    ],
  };

  return (
    <section className={`${!isAdmin && "py-14"}`}>
      {loadingProduct ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <ClipLoader />
          <p>Loading Product Details</p>
        </div>
      ) : selectedProduct ? (
        <>
          {isAdmin && (
            <p className="flex items-center gap-2 py-5 px-5 max-md:text-sm">
              <Link to={-1}>Products</Link> <BsChevronRight />
              <span className="font-semibold">{selectedProduct?.title}</span>
            </p>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 max-md:px-4 md:items-center">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center h-[400px] bg-white rounded-xl border">
                <img
                  className="rounded-3xl w-full h-full object-contain"
                  src={selectedProduct.imageUrls[indexValue].url}
                  alt=""
                />
              </div>
              <ul className="flex gap-3 items-center justify-center">
                {selectedProduct.imageUrls.map((item, index) => (
                  <li key={index} onClick={() => setIndexValue(index)}>
                    <img
                      className="w-[130px] h-[130px] object-contain cursor-pointer bg-white border rounded-xl bottom-2 hover:opacity-40 hover:border-[#086047] transition duration-200 ease-in-out p-4"
                      src={item.url}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full py-16 max-md:p-4">
              <p className="text-[#086047] font-bold mb-5">James Store</p>
              <h1 className="text-black text-4xl font-extrabold mb-6">
                {selectedProduct?.name}
              </h1>
              <p className="text-slate-400 mb-6 capitalize line-clamp-3">
                {selectedProduct?.description}
              </p>
              <div className="flex items-center justify-start gap-4 mb-10">
                <h1 className="text-xl font-semibold">
                  $
                  {numberWithCommas(
                    (Math.round(selectedProduct?.price * 100) / 100).toFixed(2)
                  )}
                </h1>
                <h1 className="text-[#086047] p-1 px-3 text-sm rounded-lg bg-[#086047]/10 font-bold">
                  50%
                </h1>
              </div>
              {/* <h1 className="text-slate-400 text-lg font-semibold line-through mb-10">
            $250
          </h1> */}
              {!isAdmin && (
                <div className="flex justify-start items-center gap-6">
                  {isItemInCart(selectedProduct) && (
                    <div className=" flex gap-4 items-center justify-evenly bg-black/[3%] rounded-lg px-4 py-3 select-none">
                      <FaMinus
                        className="flex items-center justify-center text-lg font-semibold text-[#086047] cursor-pointer"
                        onClick={() => removeFromCart(selectedProduct)}
                      />
                      <p className="mx-4 w-3 text-black-50 font-semibold">
                        {isItemInCart(selectedProduct).quantity}
                      </p>
                      <FaPlus
                        className="flex items-center justify-center text-[#086047] text-lg font-semibold cursor-pointer"
                        onClick={() => addToCart(selectedProduct)}
                      />
                    </div>
                  )}
                  {isItemInCart(selectedProduct) ? (
                    <div>
                      <p>
                        ({isItemInCart(selectedProduct).quantity}) items in cart
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                        }}
                        className=" bg-[#086047] hover:bg-[#086047]/80 text-white py-3 px-6 rounded-lg flex items-center gap-3 font-semibold"
                      >
                        <BsCartPlus />
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              )}
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
            {selectedTabIndex == 1 ? (
              <section aria-labelledby="reviews-heading" className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 py-5">
                  <div className="lg:col-span-4">
                    <h2
                      id="reviews-heading"
                      className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                      Customer Reviews
                    </h2>

                    <div className="mt-3 flex items-center">
                      <div>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <BsStarFill
                              key={rating}
                              className={classNames(
                                reviews.average > rating
                                  ? "text-yellow-400"
                                  : "text-gray-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {reviews.average} out of 5 stars
                        </p>
                      </div>
                      <p className="ml-2 text-sm text-gray-900">
                        Based on {reviews.totalCount} reviews
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="sr-only">Review data</h3>

                      <dl className="space-y-3">
                        {reviews.counts.map((count) => (
                          <div
                            key={count.rating}
                            className="flex items-center text-sm"
                          >
                            <dt className="flex flex-1 items-center">
                              <p className="w-3 font-medium text-gray-900">
                                {count.rating}
                                <span className="sr-only"> star reviews</span>
                              </p>
                              <div
                                aria-hidden="true"
                                className="ml-1 flex flex-1 items-center"
                              >
                                <BsStarFill
                                  className={classNames(
                                    count.count > 0
                                      ? "text-yellow-400"
                                      : "text-gray-300",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />

                                <div className="relative ml-3 flex-1">
                                  <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                  {count.count > 0 ? (
                                    <div
                                      className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                      style={{
                                        width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </dt>
                            <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                              {Math.round(
                                (count.count / reviews.totalCount) * 100
                              )}
                              %
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-10">
                      <h3 className="text-lg font-medium text-gray-900">
                        Share your thoughts
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        If you’ve used this product, share your thoughts with
                        other customers
                      </p>

                      <a
                        href="#"
                        className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                      >
                        Write a review
                      </a>
                    </div>
                  </div>

                  <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                    <h3 className="sr-only">Recent reviews</h3>

                    <div className="flow-root">
                      <div className="-my-12 divide-y divide-gray-200">
                        {reviews.featured.map((review) => (
                          <div key={review.id} className="py-12">
                            <div className="flex items-center">
                              <img
                                src={review.avatarSrc}
                                alt={`${review.author}.`}
                                className="h-12 w-12 rounded-full"
                              />
                              <div className="ml-4">
                                <h4 className="text-sm font-bold text-gray-900">
                                  {review.author}
                                </h4>
                                <div className="mt-1 flex items-center">
                                  {[0, 1, 2, 3, 4].map((rating) => (
                                    <BsStarFill
                                      key={rating}
                                      className={classNames(
                                        review.rating > rating
                                          ? "text-yellow-400"
                                          : "text-gray-300",
                                        "h-5 w-5 flex-shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ))}
                                </div>
                                <p className="sr-only">
                                  {review.rating} out of 5 stars
                                </p>
                              </div>
                            </div>

                            <div
                              className="mt-4 space-y-6 text-base italic text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: review.content,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <div>
                <h3 className="font-bold mb-3 text-lg">Product Description</h3>
                <pre className="text-sm">{selectedProduct.description}</pre>
                <h3 className="font-bold mb-3 text-lg mt-10">
                  Other Information
                </h3>
                <ul className="text-base list-disc space-y-1">
                  {selectedProduct.otherInformation.split("\n").map((d, i) => {
                    return <li key={i}>{d}</li>;
                  })}
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default Product;
