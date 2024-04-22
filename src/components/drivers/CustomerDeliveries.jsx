import React from "react";
import { useNavigate } from "react-router";

const CustomerDeliveries = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-full">
        <div className="relative overflow-x-auto border sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivery Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill()
                .map((_, key) => {
                  return (
                    <tr
                      className="bg-white border-b cursor-pointer hover:bg-gray-50 "
                      key={key}
                      onClick={() => navigate(`/driver/orders/${key}`)}
                    >
                      <td className="px-6 py-4">Pysavant Codes</td>
                      <td className="px-6 py-4">34, kiunston road ilasa</td>
                      <td className="px-6 py-4">+234938504853</td>
                      <td className="px-6 py-4">24/10/2024</td>
                      <td className="px-6 py-4 text-green-500">Delivered</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerDeliveries;
