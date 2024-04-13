import { Button } from "@nextui-org/react";
import React from "react";
import { BsBagCheck } from "react-icons/bs";
import { IoCubeOutline } from "react-icons/io5";
import { PiCaretLeftLight } from "react-icons/pi";
import { useNavigate, useParams } from "react-router";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <section className="p-7 max-md:p-4 max-[1088px]:flex-col gap-7 max-md:py-4">
      <div className="flex pb-4 pt-0 max-md:p-0 max-md:pb-4 border-b-default-400 border-b w-full items-center gap-x-4 max-md:flex-col max-md:items-start">
        <div className="text-[20px] flex items-center gap-x-2">
          <PiCaretLeftLight
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            size={24}
          />{" "}
          <p>Completed Orders</p>
        </div>
        <p className="text-lg">
          <span className="font-semibold">Order</span> #{id}
        </p>
      </div>
      <div className="my-5">
        <div className="grid grid-cols-2 max-md:grid-cols-1 py-5 p-6 rounded-lg border-[1px] border-default-300 gap-5 gap-x-14">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#f1f1f1] rounded-full">
                <BsBagCheck className="text-mamiblack" />
              </div>
              <p className="font-semibold text-md">Order</p>
              <p className="text-[#53A178] bg-[#F1F1F1] px-2 p-0.5 text-sm rounded-md ml-2">
                Completed
              </p>
            </div>
            <div className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-mamiblack/60">Added</p>
                <p className="text-mamiblack">6hrs ago</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-mamiblack/60">Payment Method</p>
                <p className="text-mamiblack">Mastercard</p>
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
            <div className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-mamiblack/60">Address</p>
                <p className="text-mamiblack">54, Lurem street, Off road</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-mamiblack/60">City</p>
                <p className="text-mamiblack">Ikeja</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-mamiblack/60">State</p>
                <p className="text-mamiblack">Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-[22px] mb-3 text-mamiblack font-semibold">
          Order details
        </p>
        <div className="bg-[#F9F9F9F9] p-4 px-6 max-md:px-3 rounded-lg">
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
                <tr className="">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-slate-700">
                      Luxury hand bag
                    </div>
                    <div className="mt-0.5 text-slate-500 sm:hidden">
                      1 unit at $0.00
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                    x1
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                    2,700
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    2,700
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-slate-700">
                      Luxury hand bag
                    </div>
                    <div className="mt-0.5 text-slate-500 sm:hidden">
                      1 unit at $75.00
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                    x1
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                    2,700
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    2,700
                  </td>
                </tr>
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
                    5,400
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
                    5,400
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
                    5,400
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-[22px] mb-3 text-mamiblack font-semibold">
          Payment Info
        </p>
        <div className="flex items-center gap-5 max-md:flex-col gap-y-8">
          <div className="w-[40%] max-md:w-full">
            <div>
              <div className="flex items-center gap-x-2">
                <img
                  className="w-7 object-contain h-auto"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                  alt=""
                />
                <p className="text-sm text-default-600">Thomas Emmanuel</p>
              </div>
              <p className="text-sm font-semibold text-default-700 mt-1">
                24069**** ****3120
              </p>
            </div>
            <p className="mt-3 text-mamiblack/70">
              Billing Address <br />
              26, folorunsho street, Akoka, Yaba, Lagos.
            </p>
          </div>
          <div className="w-[60%] max-md:w-full">
            <div className="flex bg-[#F9F9F9F9] p-5 rounded-md items-center gap-5 justify-between">
              <p>
                You can return this item until{" "}
                <span className="font-semibold">29th of November, 2023</span>
              </p>
              <Button
                onClick={() => navigate(`${id}/return-item`)}
                className="rounded-md p-2 h-[100%] px-5 !w-fit"
                variant="bordered"
                color="warning"
              >
                Return Item
              </Button>
            </div>
            <p className="text-sm mt-2">
              Items are eligible of return 3 days after delivery date. View
              return policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
// export default Order;
