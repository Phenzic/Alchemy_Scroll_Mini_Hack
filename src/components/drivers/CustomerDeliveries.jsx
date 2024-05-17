import React from "react";
import { useNavigate } from "react-router";
import { useDriver } from "../../context/DriverContext";

const CustomerDeliveries = ({ isDelivered }) => {
  const { fetchingOrders, fetchAllOrders, allOrders } = useDriver();
  const navigate = useNavigate();

  return (
    <>
      <div className=" w-full">
        <div className="relative overflow-x-auto border sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Delivery Time
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchingOrders ? (
                <div className="h-36 w-full">
                  <div className="flex items-center justify-center flex-col gap-3 p-5 pt-14 absolute top-0 left-0 h-full w-full">
                    <div
                      className="inline-block h-[30px] w-[30px] animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#305C45]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                    <span className="text-sm">Loading addresses...</span>
                  </div>
                </div>
              ) : allOrders.length < 1 ? (
                <p className="text-sm">No active orders found.</p>
              ) : isDelivered ? (
                allOrders.filter(
                  (order) =>
                    order.deliveryStatus == "delivered" ||
                    order.deliveryStatus == "rejected"
                ).length < 1 ? (
                  <p className="text-sm p-5">No delivery history found.</p>
                ) : (
                  allOrders
                    .filter(
                      (order) =>
                        order.deliveryStatus == "delivered" ||
                        order.deliveryStatus == "rejected"
                    )
                    .map((order, key) => {
                      return (
                        <tr
                          className="bg-white border-t cursor-pointer hover:bg-gray-50 "
                          key={key}
                          onClick={() => navigate(`/driver/orders/${order.id}`)}
                        >
                          <td className="px-6 py-4">{`#${order.id}`}</td>
                          <td className="px-6 py-4">{`${order.addressDetails.street}, ${order.addressDetails.city}`}</td>
                          <td className="px-6 py-4">
                            {order.addressDetails.phone_number}
                          </td>
                          {/* <td className="px-6 py-4">24/10/2024</td> */}
                          <td
                            className={`px-6 py-4 ${
                              order.deliveryStatus == "pending"
                                ? "text-orange-400"
                                : order.deliveryStatus == "rejected"
                                ? "text-red-500"
                                : "text-[#53A178]"
                            } capitalize`}
                          >
                            {order.deliveryStatus}
                          </td>
                        </tr>
                      );
                    })
                )
              ) : (
                allOrders
                  .filter((order) => order.deliveryStatus == "pending")
                  .map((order, key) => {
                    return (
                      <tr
                        className="bg-white border-t cursor-pointer hover:bg-gray-50 "
                        key={key}
                        onClick={() => navigate(`/driver/orders/${order.id}`)}
                      >
                        <td className="px-6 py-4">{`#${order.id}`}</td>
                        <td className="px-6 py-4">{`${order.addressDetails.street}, ${order.addressDetails.city}`}</td>
                        <td className="px-6 py-4">
                          {order.addressDetails.phone_number}
                        </td>
                        {/* <td className="px-6 py-4">24/10/2024</td> */}
                        <td
                          className={`px-6 py-4 ${
                            order.deliveryStatus == "pending"
                              ? "text-orange-400"
                              : order.deliveryStatus == "rejected"
                              ? "text-red-500"
                              : "text-[#53A178]"
                          } capitalize`}
                        >
                          {order.deliveryStatus}
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerDeliveries;
