import { Button } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { IoCubeOutline } from "react-icons/io5";
import { PiCaretLeftLight } from "react-icons/pi";
import { useNavigate, useParams } from "react-router";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { timeAgo } from "../../utils/helper";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [order, setOrder] = useState(null);
  const [deliveryAddress, setdeliveryAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoadingOrder(true);
      const res = await getDoc(doc(db, "orders", id));
      setLoadingOrder(false);
      if (res.exists()) {
        setOrder(res.data());
      }
    } catch (error) {
      setLoadingOrder(false);
      toast.error("An error occured while fetching order details");
    }
  };

  const fetchDeliveryDetails = async (addressId) => {
    try {
      setLoadingAddress(true);
      const res = await getDoc(doc(db, "addresses", addressId));
      setLoadingAddress(false);
      if (res.exists()) {
        setdeliveryAddress(res.data());
      }
    } catch (error) {
      setLoadingAddress(false);
      toast.error("An error occured while fetching order details");
    }
  };

  useEffect(() => {
    if (order) {
      fetchDeliveryDetails(order.addressId);
    }
  }, [order]);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  return (
    <section className="p-7 min-h-[50vh] max-md:p-4 max-[1088px]:flex-col gap-7 max-md:py-4 w-full">
      <div className="flex pb-4 pt-0 max-md:p-0 max-md:pb-4 border-b-default-400 border-b w-full items-center gap-x-4 max-md:flex-col max-md:items-start">
        <div className="text-[20px] flex items-center gap-x-2">
          <PiCaretLeftLight
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            size={24}
          />{" "}
          <p className="text-lg flex items-center gap-3">
            <span className="font-semibold text-2xl">Order</span> #{id}
          </p>
        </div>
      </div>
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
      ) : !order ? (
        <p className="py-5">This Order does not exist</p>
      ) : (
        <>
          <div className="my-5">
            <div className="grid grid-cols-2 max-md:grid-cols-1 py-5 p-6 rounded-lg border-[1px] border-default-300 gap-5 gap-x-14">
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#f1f1f1] rounded-full">
                    <BsBagCheck className="text-mamiblack" />
                  </div>
                  <p className="font-semibold text-md">Order</p>
                  <p
                    className={`${
                      order.deliveryStatus == "pending"
                        ? "text-orange-400"
                        : order.deliveryStatus == "rejected"
                        ? "text-red-500"
                        : "text-[#53A178]"
                    } bg-[#F1F1F1] px-2 p-0.5 text-sm rounded-md ml-2 capitalize font-medium`}
                  >
                    {order.deliveryStatus}
                  </p>
                </div>
                <div className="pt-5 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-mamiblack/60">Added</p>
                    <p className="text-mamiblack">{timeAgo(order.createdOn)}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-mamiblack/60">Payment Method</p>
                    <p className="text-mamiblack">Credit Card</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-mamiblack/60">Shipping Method</p>
                    <p className="text-mamiblack">Home delivery</p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#f1f1f1] rounded-full">
                    <IoCubeOutline className="text-mamiblack" />
                  </div>
                  <p className="font-semibold text-md">Delivery details</p>
                </div>
                {loadingAddress ? (
                  <div className="flex items-center justify-center flex-col gap-3 py-7">
                    <div
                      className="inline-block h-[30px] w-[30px] animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#305C45]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                    <span className="text-sm">
                      Fetching delivery details...
                    </span>
                  </div>
                ) : !deliveryAddress ? (
                  <p className="py-5">Details not found.</p>
                ) : (
                  <div className="pt-5 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-mamiblack/60">Address</p>
                      <p className="text-mamiblack">{deliveryAddress.street}</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-mamiblack/60">City</p>
                      <p className="text-mamiblack">{deliveryAddress.city}</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-mamiblack/60">Phone</p>
                      <p className="text-mamiblack">
                        {deliveryAddress.phone_number}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-[22px] mb-3 text-mamiblack font-semibold">
              Order details
            </p>
            <div className="bg-[#F9F9F9F9] border p-4 px-6 max-md:px-3 rounded-lg">
              <div className="flex flex-col mx-0 ">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, idx) => {
                      return (
                        <tr key={idx} className="">
                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-slate-700">
                              {product.name}
                            </div>
                            <div className="mt-0.5 text-slate-500 sm:hidden">
                              1 unit at ${product.price}
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            x{product.quantity}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            {product.price}
                          </td>
                          <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {product.price * product.quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        {order.products
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Shipping
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Shipping
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        0.00
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                      >
                        Total
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                        {order.products
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Order;
// export default Order;
