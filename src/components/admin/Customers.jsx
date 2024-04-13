import React from "react";
import { useNavigate } from "react-router";

const Customers = () => {
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
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Joined on
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                
              </tr>
            </thead>
            <tbody>
              {Array(10)
                .fill()
                .map((_, key) => {
                  return (
                    <tr
                      className="bg-white border-b cursor-pointer hover:bg-gray-50 "
                      key={key}
                    >
                      <td className="px-6 py-4">Pysavant Codes</td>
                      <td className="px-6 py-4">uwak123@384.com</td>
                      <td className="px-6 py-4">+234938504853</td>
                      <td className="px-6 py-4">24/10/2024</td>
                      <td className="px-6 py-4 text-green-500">Active</td>
                      
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

export default Customers;
