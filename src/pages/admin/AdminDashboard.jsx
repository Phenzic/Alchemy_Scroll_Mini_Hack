import AdminInfo from "../../components/admin/AdminInfo";
import BarChat from "../../components/charts/BarChat";
import { PieChat } from "../../components/charts/PieChat";
import AdminOrders from "./AdminOrders";
import {getOrders} from "../../utils/firebase/index" 
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalSales, setTotalSales] = useState(0);
  const [yesterOrders, setYesterdayOrders] = useState(0);
  const today = new Date()

  const fetchOrders = async()=>{
    const orders = await getOrders();
    const totalSales = orders.reduce((acc, eachOrder)=>{
      const price = Number(eachOrder.product.price)*eachOrder.product.quantity;
      return acc+=price;
    }, 0)
    const orderYesterday = orders.filter((eachOrder)=>{
      const today = new Date();
      const date = new Date(eachOrder.createdOn.seconds*1000);
      const yesterday = new Date(date.getTime() - 86400000).getDate();
      if(today.getDate()-yesterday==5){
        return eachOrder;
      }
    })
    setTotalSales(totalSales)
    setTotalOrders(orders.length)
    setYesterdayOrders(orderYesterday.length)
    // console.log(orderYesterday)
    // console.log(orders);
  }

  useEffect(()=>{
    console.log(today.getDay())
    fetchOrders();
  },[])




  return (
    <div className="flex flex-col gap-5 p-5 overflow-auto">
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        <AdminInfo heading={"Total Sales Made"} money={true} amount={totalSales} isYesterday={false}/>
        <AdminInfo amount={totalOrders} isYesterday={false} heading={"Total Orders Made"} />
        <AdminInfo  amount={yesterOrders} isYesterday={true} heading={"Total Orders"} />
      </div>

      <div className="flex gap-10 overflow-hidden justify-between bg-white p-4 py-6 rounded-2xl w-[100%] h-fit border overflow-x-auto max-lg:flex-col max-lg:items-center">
        <BarChat />
        <PieChat />
      </div>

      <div className="p-5 bg-white rounded-2xl border">
        <AdminOrders/>
      </div>


    </div>
  );

  // function AdminInfo() {
  //   return (
  //     <div className="p-6 flex-col  bg-white w-full rounded-2xl border">
  //       <p className="text-neutral-400 text-lg font-normal mb-5">Total sales</p>

  //       <h1 className="text-neutral-700 text-[28px] font-medium mb-3">
  //         $ 185,700
  //       </h1>

  //       <p className="text-neutral-700 text-sm font-normal leading-tight inline-flex gap-2 items-center">
  //         <span className="px-3 py-1 text-[#0d0d0d] bg-[#305c4523] rounded-3xl font-medium">
  //           4.8%
  //         </span>
  //         from yesterday
  //       </p>
  //     </div>
  //   );
  // }
};

export default AdminDashboard;
