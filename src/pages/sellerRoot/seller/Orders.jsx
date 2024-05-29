import React, { useContext, useEffect, useState } from "react";
import { productData } from "../../../utils/testData";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import Pagination from "../../../components/pagination/Pagination";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useUser } from "../../../context/UserContext";
import { ClipLoader } from "react-spinners";
import { formatDateToDDMMYYYY } from "../../../utils/helper";
import { SellerContext } from "../../../context/SellerContext";
import { useUserName } from "../../../hooks/useUserName";
import toast from "react-hot-toast";

const Orders = () => {
  const navigate = useNavigate();
  const { userDetails } = useUser();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [userNames, setUserNames] = useState({});
  const [loadingUserNames, setLoadingUserNames] = useState(true);

  const { getUserNameFunc } = useContext(SellerContext);

  const getOrders = async ({ snapshot }) => {
    try {
      const orderData = snapshot.docs.map((order) => ({
        id: order.id,
        ...order.data(),
      }));

      setOrders(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ordersCollectionRef = collection(db, "orders");
    const q = query(
      ordersCollectionRef,
      where("productSellerId", "==", userDetails.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      getOrders({ snapshot: snapshot });
      setLoadingOrders(false);
    });

    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const userNamesMap = {};
        for (const order of orders) {
          const res = await getDoc(doc(db, "addresses", order.addressId));
          if (res.exists()) {
            userNamesMap[order.addressId] = `${res.data().first_name} ${res.data().last_name}` ;
          } else {
            userNamesMap[order.addressId] = 'No user found';
          }
        }
        setUserNames(userNamesMap);
        console.log("user maps")
        console.log(userNamesMap)
        setLoadingUserNames(false);
      } catch (error) {
        toast.error("An error occurred while fetching user details");
        setLoadingUserNames(false);
      }
    };

    if (orders.length > 0) {
      fetchUserNames();
    }
  }, [orders]);

  return (
    <React.Fragment>
      <div className="px-3">
        <section className=" pt-1 pb-7 flex justify-between text-sm items-center">
          <select
            name=""
            className=" text-gray-500 font-light  md:hidden outline-none border-2 py-2 px-3 rounded-lg"
            id=""
          >
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">Last 21 days</option>
          </select>
          <button className=" border-[2px] px-2 py-1 font-sans rounded-md text-gray-500">
            Export CSV
          </button>
        </section>
        {/* MAPPING THROUGH THE FAKE API TO GET TITLE AND PRICES INORDER TO DISPLAY */}
        {/* MOBILE VIEW OF SELLERS ORDER PAGE */}
        <main className=" bg-white px-2 py-5 rounded-md">
          <div className=" sm:hidden flex flex-col gap-5">
            {loadingOrders ? (
              <div className="flex gap-4 items-center justify-center py-4 w-full">
                <ClipLoader color="#086047" size={30} />
                <p>Loading Products</p>
              </div>
            ) : orders.length > 0 ? (
              orders.map((eachProduct) => {
                return (
                  <NavLink key={eachProduct.id} to={`${eachProduct.id}`}>
                    <div
                      key={eachProduct.id}
                      className=" rounded-md py-2 border-2 px-3 flex flex-col gap-5"
                    >
                      <section className=" flex items-center justify-between">
                        <h1 className=" text-sm text-black font-semibold font-sans">
                          {eachProduct.product.name}
                        </h1>
                        <aside className=" gap-3 flex items-center">
                          {/* <FiEdit3 />
                          <GoTrash /> */}
                        </aside>
                      </section>

                      <div className=" text-[12px] border-t-[1px] flex flex-col gap-4 py-5">
                        <section className="flex justify-between text-sm text-gray-700">
                          <p className=" text-gray-500 font-light text-[12px]">
                            Product
                          </p>
                          <p className=" text-[12px]">
                            {eachProduct.product.name}
                          </p>
                        </section>
                        <section className="flex justify-between text-sm text-gray-700">
                          <p className=" text-gray-500 font-light text-[12px]">
                            Date
                          </p>
                          <p className=" text-xs">{formatDateToDDMMYYYY(eachProduct.createdOn)}</p>
                        </section>
                        <section className="flex justify-between text-sm text-gray-700">
                          <p className=" text-gray-500 font-light text-[12px]">
                            Customer name
                          </p>
                          <p className=" text-[12px]"> {userNames[eachProduct.addressId] || 'Loading...'}</p>
                        </section>
                        <section className="flex justify-between text-sm text-gray-700">
                          <p className=" text-gray-500 font-light text-[12px]">
                            Revenue(₦)
                          </p>
                          <p className=" text-xs">{eachProduct.price}</p>
                        </section>
                        {/* <section className="flex justify-between text-sm text-gray-700">
                          <p className=" text-gray-500 font-light text-[12px]">
                            Profit(₦)
                          </p>
                          <p className=" text-xs">
                            {Math.floor(Math.random() * 100)}
                          </p>
                        </section> */}
                        <section className="flex justify-between text-sm text-gray-700">
                          <p className=" text-gray-500 font-light text-[12px]">
                            Status
                          </p>
                          <p className=" text-xs">
                          {eachProduct.deliveryStatus == "pending" ? (
                              <span className=" text-yellow-400">Pending</span>
                            ) : (
                              <span className=" text-green-400">Completed</span>
                            )}
                          </p>
                        </section>
                        <section className="flex justify-between text-sm text-gray-700">
                          <p className=" text-gray-500 font-light text-[12px]">
                            Category
                          </p>
                          <p className=" text-[12px]">
                            {eachProduct.product.category}
                          </p>
                        </section>
                      </div>
                    </div>
                  </NavLink>
                );
              })
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-xl text-green-800">No Products.</p>
              </div>
            )}
          </div>
          {/* DESKTOP VIEW OF SELLERS ORDER PAGE */}

          <div className="w-full max-sm:hidden">
            <div className="relative overflow-x-auto border sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 md:table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr className="">
                    <th scope={"col"} className=" px-5 py-5 ">
                      Order ID
                    </th>
                    <th scope={"col"} className=" px-10 py-5">
                      Product
                    </th>
                    <th scope={"col"} className=" px-10 py-5">
                      Date
                    </th>
                    <th scope={"col"} className=" px-8 py-5">
                      Customer
                    </th>
                    <th scope={"col"} className=" px-1 py-5">
                      Revenue (₦)
                    </th>
                    <th scope={"col"} className=" px-10 py-5">
                      Status
                    </th>
                    <th scope={"col"} className=" px-5 py-5">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loadingOrders ? (
                    <div className="flex gap-4 items-center justify-center py-4 w-full">
                      <ClipLoader color="#086047" size={30} />
                      <p>Loading Products</p>
                    </div>
                  ) : orders.length > 0 ? (
                    orders.map((order) => {
                   
                      return (
                        <tr
                          key={order.id}
                          onClick={function () {
                            navigate(`${order.id}`);
                          }}
                          className="bg-white border-b  hover:bg-gray-50 "
                        >
                          <td className="px-6 py-4 truncate">{order.id}</td>
                          <td className="px-6 py-4 truncate">
                            {order.product.name}
                          </td>
                          <td className="px-6 py-4 truncate">
                            {formatDateToDDMMYYYY(order.createdOn)}
                          </td>
                          <td className="px-6 py-4 truncate">
                            {userNames[order.addressId] || 'Loading...'}
                          </td>
                          <td className="px-6 py-4 truncate">
                            {order.product.price}
                          </td>
                          <td className="px-6 py-4">
                            {order.deliveryStatus == "pending" ? (
                              <span className=" text-yellow-400">Pending</span>
                            ) : (
                              <span className=" text-green-400">Completed</span>
                            )}
                          </td>
                          <td className="px-6 py-4">View →</td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <p className="text-xl text-green-800">No Products.</p>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <section className=" py-5">
            <select
              name=""
              className=" sm:hidden outline-none border-2 font-semibold text-slate-700 py-1 px-1 rounded-lg"
              id=""
            >
              <option value="">5 per page</option>
              <option value="">10 per page</option>
            </select>
            <section className=" max-sm:hidden">
              <Pagination />
            </section>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Orders;
