/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import {getOrders} from "../../utils/firebase/index"
import { useEffect, useState } from "react";
import {ClipLoader} from "react-spinners"


const Orders = ({option}) => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  
  const fetchOrders = async()=>{
    try{
      const orders = await getOrders();
      const lowerCaseOption = option.toLowerCase();
      const filteredOrders = lowerCaseOption == "all"?orders :orders.filter((order)=> order.deliveryStatus==lowerCaseOption);
      setOrders(filteredOrders)
      
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchOrders()
  },[ option])

  return (
    <>
      {
       orders.length===0?<div className=' flex flex-col justify-center items-center py-2 '><ClipLoader/></div>:
       <div className=" w-full">
        <div className="relative overflow-x-auto border sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Items
                </th>
                <th scope="col" className="px-6 py-3">
                  Price ( $ )
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount ($ )
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                
              </tr>
              
            </thead>
            <tbody>
              {orders.map((eachOrder, key) => {
                  return (
                    <tr
                    onClick={()=> navigate(`/admin/orders/${eachOrder.collectionId}`)}
                      className="bg-white border-b cursor-pointer hover:bg-gray-50 "
                      key={key}
                    >
                      <td className="px-6 py-4">{eachOrder.product?.name || "N/A"}</td>
                      <td className="px-6 py-4">{eachOrder.product?.price || "N/A"}</td>
                      <td className="px-6 py-4">{eachOrder.product?.quantity || "N/A"}</td>
                      <td className="px-6 py-4">{Number(eachOrder?.product?.price)*eachOrder?.product?.quantity}</td>
                      <td className="px-6 py-4">{eachOrder.product?.category || "N/A"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div> 
      }
    </>
  );
};

export default Orders;
