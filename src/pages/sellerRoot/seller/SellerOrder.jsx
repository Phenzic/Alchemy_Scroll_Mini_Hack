import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { productData } from "../../../utils/testData";
import { AiOutlineUser } from "react-icons/ai";
import { BsBagCheck, BsBag } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
import { FcProcess } from "react-icons/fc";
import { TbCurrentLocation } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { IoCheckboxOutline } from "react-icons/io5";
import mastercard from "../../../assets/mastercardicon.png";

import {
  formatDateToDDMMYYYY,
  numberWithCommas,
  timeAgo,
} from "../../../utils/helper";
import { SellerContext } from "../../../context/SellerContext";

function SellerOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchUserDetails,
    loadingOrder,
    orderUserDetails,
    // setOrderUserDetails,
    setLoadingOrder,
    order,
    // setOrder,
    deliveryAddress,
    // setdeliveryAddress,
    fetchOrder,
    fetchDeliveryDetails,
    subTotalCalculations,
  } = useContext(SellerContext);


  useEffect(() => {
    if (order) {
      fetchDeliveryDetails(order.addressId);
      fetchUserDetails(order.userId);
      console.log("FROM SELLER ORDER")
      console.log(order);
    }
  }, []);

  useEffect(() => {
    
    fetchOrder(id);
  }, [id]);

  return (
    <React.Fragment>
      <div>
        <header className=" flex justify-between">
          <button
            className=" text-lg font-bold"
            onClick={() => {
              navigate(-1);
            }}
          >
            ←
          </button>
          <section className=" text-sm gap-3 flex items-center">
            <p>Order</p>
            <p className=" font-semibold">{`#${id}`}</p>
          </section>
        </header>
        <section className=" py-5 flex justify-between">
          <select
            name=""
            className=" py-1.5  outline-none border-2  text-gray-400  px-1 rounded-lg text-sm"
            id=""
          >
            <option value="">Processing</option>
            <option value="">Completed</option>
          </select>
          <button className=" border-[2px] px-2 py-1 font-sans rounded-md text-gray-400 text-sm">
            Export CSV
          </button>
        </section>
        <main className=" py-3 space-y-4">
          {loadingOrder ? (
            <div className="flex items-center justify-center flex-col gap-3 py-14">
              <div
                className="inline-block h-[30px] w-[30px] animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#305C45]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <span className="text-sm">Fetching order details...</span>
            </div>
          ) : !order || !deliveryAddress || !orderUserDetails ? (
            <p className="py-5">This Order does not exist</p>
          ) : (
            <>
              <div className=" lg:grid lg:grid-cols-3 lg:divide-x-2 lg:divide-y-0 divide-y-2 flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm">
                <section className=" flex flex-col gap-5 pt-5 px-5">
                  <header className=" flex items-center gap-3">
                    <AiOutlineUser className=" bg-gray-200 p-1 rounded-full text-2xl" />
                    <span className=" text-xs">Customer</span>
                  </header>
                  <main className=" text-xs space-y-2">
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">Name</p>
                      <p>
                        {" "}
                        {`${deliveryAddress.first_name} ${deliveryAddress.last_name}`}{" "}
                      </p>
                    </div>
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">Email</p>
                      <p>{orderUserDetails.email}</p>
                    </div>
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">Phone</p>
                      <p>{deliveryAddress.phone_number}</p>
                    </div>
                  </main>
                </section>
                <section className="flex flex-col gap-3 pt-5 px-5">
                  <header className=" flex items-center gap-3">
                    <BsBagCheck className=" bg-gray-200 px-1 rounded-full text-2xl" />
                    <span className=" text-xs">
                      Order &nbsp;| &nbsp;
                      {order.deliveryStatus == "delivered" ? (
                        <span className=" text-green-400">Completed</span>
                      ) : (
                        <span className=" text-yellow-400">Pending</span>
                      )}
                    </span>
                  </header>
                  <main className=" text-xs space-y-2">
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">Added</p>
                      <p>{timeAgo(order.createdOn)}</p>
                    </div>
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">
                        Payment Method
                      </p>
                      <p>Mastercard</p>
                    </div>
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">Shipping</p>
                      <p>Home Delivery</p>
                    </div>
                  </main>
                </section>
                <section className=" flex flex-col gap-3 pt-5 px-5">
                  <header className=" flex items-center gap-3">
                    <FiBox className=" bg-gray-200 p-1 rounded-full text-2xl" />
                    <span className=" text-xs">Delivery Details</span>
                  </header>
                  <main className=" text-xs space-y-2">
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">Addres</p>
                      <p>{deliveryAddress.street}</p>
                    </div>
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">City</p>
                      <p>{deliveryAddress.city}</p>
                    </div>
                    <div className=" flex justify-between">
                      <p className=" text-gray-500 font-semibold">State</p>
                      <p>Lagos</p>
                    </div>
                  </main>
                </section>
              </div>
              <div className="  divide-y-2 flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm">
                <h1 className=" font-semibold text-sm">{order.product.name}</h1>
                <main className=" text-xs space-y-2 py-3">
                  <div className=" flex justify-between">
                    <p className=" text-gray-500 font-semibold">Quantity</p>
                    <p>{order.product.quantity}</p>
                  </div>
                  <div className=" flex justify-between">
                    <p className=" text-gray-500 font-semibold">Price(₦)</p>
                    <p>{numberWithCommas(order.product.price)}</p>
                  </div>
                  <div className=" flex justify-between">
                    <p className=" text-gray-500 font-semibold">
                      Transaction Fee
                    </p>
                    <p>100</p>
                  </div>
                </main>
                <main className=" text-xs space-y-2 py-3">
                  <div className=" flex justify-between">
                    <p className=" text-gray-500 font-semibold">Sub Total</p>
                    <p>{`₦${numberWithCommas(subTotalCalculations())}`}</p>
                  </div>
                  <div className=" flex justify-between">
                    <p className=" text-gray-500 font-semibold">Shipping</p>
                    <p>₦1,000</p>
                  </div>
                  <div className=" flex justify-between">
                    <p className=" text-gray-500 font-semibold">Total</p>
                    <p>{`₦${numberWithCommas(
                      subTotalCalculations() + 1000
                    )}`}</p>
                  </div>
                </main>
              </div>
              <div className=" flex flex-col gap-5 lg:grid lg:grid-cols-2">
                <div className=" lg:h-fit divide-y-2 flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm">
                  <main className=" py-1 flex flex-col gap-2 px-4">
                    <p className=" font-semibold text-sm ">Payment Info</p>
                    <section className=" flex items-center">
                      <img src={mastercard} className=" w-6" alt="mastercard" />
                      <p className=" text-xs">{"Samuel Sampson"}</p>
                    </section>
                    <section className=" flex items-center justify-between">
                      <p className=" text-xs">23124 **** **** 2340</p>
                      <p className=" bg-gray-200 text-gray-700 w-fit px-2 py-1 rounded-md text-xs ">
                        Default
                      </p>
                    </section>
                    <section className=" space-y-1 text-sm text-gray-500">
                      <p>Billing Address</p>
                      <p>7th Avenue Ikeja</p>
                    </section>
                  </main>
                </div>
                <div className=" flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm">
                  <section className=" text-gray-500 text-sm space-y-2">
                    <header className=" text-black flex items-center gap-3">
                      <BsBag className=" bg-gray-200 p-1 rounded-full text-3xl" />
                      <span className=" font-medium text-sm">Order</span>
                    </header>
                    <p className=" px-10">Customer placed order</p>
                    <p className=" px-10">
                      {formatDateToDDMMYYYY(order.createdOn)}
                    </p>
                  </section>
                  <section className=" text-gray-500 text-sm space-y-2">
                    <header className=" text-black flex items-center gap-3">
                      <FcProcess className=" text-black bg-gray-200 p-1 rounded-full text-3xl" />
                      <span className=" font-medium text-sm">Processing</span>
                    </header>
                    <p className=" px-10">
                      Seller has received and processed order
                    </p>
                    <p className=" px-10">08/08/2023</p>
                  </section>
                  <section className=" text-gray-500 text-sm space-y-2">
                    <header className=" text-black flex items-center gap-3">
                      <TbCurrentLocation className=" bg-gray-200 p-1 rounded-full text-3xl" />
                      <span className=" font-medium text-sm">IPC Center</span>
                    </header>
                    <p className=" px-10">
                      Item processed and departs IPC center
                    </p>
                    <p className=" px-10">07/08/2023</p>
                  </section>
                  <section className=" text-gray-500 text-sm space-y-2">
                    <header className=" text-black flex items-center gap-3">
                      <FaShippingFast className=" bg-gray-200 p-1 rounded-full text-3xl" />
                      <span className=" font-medium text-sm">Shipping</span>
                    </header>
                    <p className=" px-10">
                      Item processed and departs IPC center
                    </p>
                    <p className=" px-10">--/--/----</p>
                  </section>
                  <section className=" text-gray-500 text-sm space-y-2">
                    <header className=" text-black flex items-center gap-3">
                      <IoCheckboxOutline className=" bg-gray-200 p-1 rounded-full text-3xl" />
                      <span className=" font-medium text-sm">Delivered</span>
                    </header>
                    <p className=" px-10">
                      Item processed and departs IPC center
                    </p>
                    <p className=" px-10">--/--/----</p>
                  </section>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </React.Fragment>
  );
}

export default SellerOrder;
