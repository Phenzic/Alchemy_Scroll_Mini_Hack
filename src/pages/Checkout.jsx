import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsArrowRight, BsCheck, BsClock, BsX } from "react-icons/bs";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { AccountHeader } from "../components/account/AccountHeader";
import DeliveryAddress from "../components/account/DeliveryAddress";
import { AccountButtonOutline } from "../components/Buttons/AccountButtons";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];
const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Checkout = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const { cartItems, addToCart, removeFromCart, getCartTotal } = useCart();
  const { currentUser, userDetails } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const makePayment = async () => {
    if (email == "" || selectedAddress == "") {
      toast.error(
        "Please fill in all fields and make sure an address is selected to continue"
      );
    } else {
      setIsLoading(true);
      const stripe = await loadStripe(
        "pk_test_51P81xGRsmFh9wreMAPKsFUb4rxicJJyWp347tq7y0qgksvvXJC2EVepIwk2SkzENu8InXzOUSHyAYFV1j0w3BG0q00Gk8PmyRr"
      );

      const body = {
        products: cartItems.map((item) => {
          let newObj = { ...item, name: item.title };
          delete newObj["title"];
          delete newObj["description"];
          return { ...newObj };
        }),
        customerEmail: email,
        userId: userDetails.uid,
        addressId: selectedAddress,
      };

      const response = await axios.post(
        `https://jamazan-backend.vercel.app/create-checkout-session`,
        body
      );

      const session = await response.data;
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error("An error occured while making payment");
        console.log(result.error);
      }
    }
  };

  return (
    <>
      {currentUser ? (
        <div className="">
          <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 max-md:pt-5 sm:px-6 lg:max-w-7xl lg:px-8">
            <AccountHeader hasBack text="" heading={`Checkout`} />

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 mt-5">
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>

                  <div className="mt-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#086047] focus:ring-[#086047] sm:text-sm p-3 border"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Delivery Information
                  </h2>
                  <DeliveryAddress
                    onAddressSelected={(address) => setSelectedAddress(address)}
                    isHome={false}
                  />
                  <div className="flex justify-end mt-5 py-3">
                    <AccountButtonOutline
                      text="Add new address"
                      onClick={() => {
                        navigate("/account/profile/add-new-address");
                      }}
                      className="px-5"
                    />
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                  >
                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                      Delivery method
                    </RadioGroup.Label>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      {deliveryMethods.map((deliveryMethod) => (
                        <RadioGroup.Option
                          key={deliveryMethod.id}
                          value={deliveryMethod}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? "border-transparent"
                                : "border-gray-300",
                              active ? "ring-2 ring-[#086047]" : "",
                              "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className="flex flex-1">
                                <span className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {deliveryMethod.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {deliveryMethod.turnaround}
                                  </RadioGroup.Description>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    {deliveryMethod.price}
                                  </RadioGroup.Description>
                                </span>
                              </span>
                              {checked ? (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-[#086047]"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-[#086047]"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                      {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                        <div
                          key={paymentMethod.id}
                          className="flex items-center"
                        >
                          {paymentMethodIdx === 0 ? (
                            <input
                              id={paymentMethod.id}
                              name="payment-type"
                              type="radio"
                              defaultChecked
                              className="h-4 w-4 border-gray-300 text-[#086047] focus:ring-[#086047]"
                            />
                          ) : (
                            <input
                              id={paymentMethod.id}
                              name="payment-type"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-[#086047] focus:ring-[#086047]"
                            />
                          )}

                          <label
                            htmlFor={paymentMethod.id}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {paymentMethod.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200 px-6">
                    {cartItems.map((product, productIdx) => (
                      <li key={product.id} className="flex py-6 sm:py-6">
                        <div className="flex-shrink-0 border rounded-lg">
                          <img
                            src={product.image}
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative flex justify-between max-xl:flex-col sm:gap-x-6 sm:pr-0">
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

                            <div className="mt-4">
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
                  <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${getCartTotal()}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $0.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $0.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${getCartTotal()}
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <button
                      disabled={cartItems.length < 1 || isLoading}
                      onClick={() => makePayment()}
                      className="w-full rounded-md border border-transparent bg-[#086047] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#086047] focus:outline-none focus:ring-2 focus:ring-[#086047] focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div
                          className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      ) : (
                        "Confirm Order"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center gap-4 py-24 text-center">
          <div className="w-full h-full flex flex-col items-center gap-4 p-5">
            <img
              className="w-[280px] h-[280px]"
              src="https://bafybeidl33fbxkd77oaj3d2hwzwctbf7lhlb242kuuldob2vimlem37c24.ipfs.w3s.link/Login-cuate.svg"
              alt=""
            />
            <div className="flex items-center flex-col gap-1">
              <h1 className="font-bold text-xl">
                You have to be logged in to checkout products
              </h1>
              <Link
                to={"/auth/login"}
                className="flex items-center gap-2 text-[#086047] text-base font-semibold"
              >
                <span>Sign in to your account</span>
                <BsArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
