import React from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {productData} from "../../../utils/testData";
import {AiOutlineUser} from "react-icons/ai";
import {BsBagCheck,BsBag} from "react-icons/bs"
import {FiBox} from "react-icons/fi"
import {FcProcess} from "react-icons/fc"
import {TbCurrentLocation} from "react-icons/tb"
import {FaShippingFast} from "react-icons/fa"
import {IoCheckboxOutline} from "react-icons/io5"
import mastercard from "../../../assets/mastercardicon.png"


function SellerOrder() {

  const navigate = useNavigate();
  const {id} = useParams();
  const filter = productData.filter((order)=>{
    return(order.id==id);
  });
  
  return (
    <React.Fragment>
      <div>
        <header className=' flex justify-between'>
          <button className=' text-lg font-bold' onClick={()=>{
            navigate(-1)
          }}>←</button>
          <section className=' text-sm gap-3 flex items-center'>
            <p>Order</p>
            <p className=' font-semibold'>{`#$2344`}</p>
          </section>
        </header>
        <section className=' py-5 flex justify-between'>
          <select name="" className=' py-1.5  outline-none border-2  text-gray-400  px-1 rounded-lg text-sm' id="">
            <option value="">Processing</option>
            <option value="">Completed</option>
          </select>
          <button className=' border-[2px] px-2 py-1 font-sans rounded-md text-gray-400 text-sm'>Export CSV</button>
        </section>
       <main className=' py-3 space-y-4'>
          {
            filter.map((filterOrder)=>{
              return(
                <>
                  <div className=' lg:grid lg:grid-cols-3 lg:divide-x-2 lg:divide-y-0 divide-y-2 flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm'>
                    <section className=' flex flex-col gap-5 pt-5 px-5'>
                      <header  className=' flex items-center gap-3'><AiOutlineUser className=' bg-gray-200 p-1 rounded-full text-2xl'/><span className=' text-xs'>Customer</span></header>
                      <main className=' text-xs space-y-2'>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Name</p>
                            <p>Samuel Sampson</p>
                        </div>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Email</p>
                            <p>a.samuelsamson@gmail.com</p>
                        </div>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Phone</p>
                            <p>0810 660 6329</p>
                        </div>
                      </main>
                    </section>
                    <section className='flex flex-col gap-3 pt-5 px-5'>
                        <header  className=' flex items-center gap-3'><BsBagCheck className=' bg-gray-200 px-1 rounded-full text-2xl'/><span className=' text-xs'>Order &nbsp;| &nbsp;{Math.floor(Math.random() * 2) == 0 ? (<span className=" text-yellow-400">Pending</span>) : (
                          <span className=" text-green-400">Completed</span>
                        )}</span></header>
                        <main className=' text-xs space-y-2'>
                            <div className=' flex justify-between'>
                                <p className=' text-gray-500 font-semibold'>Added</p>
                                <p>6hrs ago</p>
                            </div>
                            <div className=' flex justify-between'>
                                <p className=' text-gray-500 font-semibold'>Payment Method</p>
                                <p>Mastercard</p>
                            </div>
                            <div className=' flex justify-between'>
                                <p className=' text-gray-500 font-semibold'>Shipping</p>
                                <p>Home Delivery</p>
                            </div>
                        </main>
                    </section>
                    <section className=' flex flex-col gap-3 pt-5 px-5'>
                        <header  className=' flex items-center gap-3'><FiBox className=' bg-gray-200 p-1 rounded-full text-2xl'/><span className=' text-xs'>Delivery Details</span></header>
                        <main className=' text-xs space-y-2'>
                            <div className=' flex justify-between'>
                                <p className=' text-gray-500 font-semibold'>Addres</p>
                                <p>7th Avenue</p>
                            </div>
                            <div className=' flex justify-between'>
                                <p className=' text-gray-500 font-semibold'>City</p>
                                <p>Ikeja</p>
                            </div>
                            <div className=' flex justify-between'>
                                <p className=' text-gray-500 font-semibold'>State</p>
                                <p>Lagos</p>
                            </div>
                        </main>
                    </section>
                  </div>
                  <div className='  divide-y-2 flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm'>
                    <h1 className=" font-semibold text-sm">{filterOrder.title}</h1>
                    <main className=' text-xs space-y-2 py-3'>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Quantity</p>
                            <p>2</p>
                        </div>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Price(₦)</p>
                            <p>3000</p>
                        </div>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Transaction Fee</p>
                            <p>100</p>
                        </div>
                      </main>
                      <main className=' text-xs space-y-2 py-3'>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Sub Total</p>
                            <p>₦3,100</p>
                        </div>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Shipping</p>
                            <p>₦1,000</p>
                        </div>
                        <div className=' flex justify-between'>
                            <p className=' text-gray-500 font-semibold'>Total</p>
                            <p>₦4,100</p>
                        </div>
                      </main>
                  </div>
                  <div className=' flex flex-col gap-5 lg:grid lg:grid-cols-2'>
                    <div className=' lg:h-fit divide-y-2 flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm'>
                      <main className=' py-1 flex flex-col gap-2 px-4'>
                        <p className=' font-semibold text-sm '>Payment Info</p>
                        <section className=' flex items-center'>
                          <img src={mastercard} className=' w-6' alt="mastercard" />
                          <p className=' text-xs'>{"Samuel Sampson"}</p>
                        </section>
                        <section className=' flex items-center justify-between'>
                          <p className=' text-xs'>23124 **** **** 2340</p>
                          <p className=' bg-gray-200 text-gray-700 w-fit px-2 py-1 rounded-md text-xs '>Default</p>
                        </section>
                        <section className=' space-y-1 text-sm text-gray-500'>
                          <p>Billing Address</p>
                          <p>7th Avenue Ikeja</p>
                        </section>
                      </main>
                      
                    </div>
                    <div className=' flex flex-col gap-5 bg-white px-3 py-4 rounded-md shadow-sm'>
                      <section className=" text-gray-500 text-sm space-y-2">
                        <header  className=' text-black flex items-center gap-3'><BsBag className=' bg-gray-200 p-1 rounded-full text-3xl'/><span className=' font-medium text-sm'>Order</span></header>
                        <p className=' px-10'>Customer placed order</p>
                        <p className=' px-10'>07/08/2023</p>
                      </section>
                      <section className=" text-gray-500 text-sm space-y-2">
                        <header  className=' text-black flex items-center gap-3'><FcProcess className=' text-black bg-gray-200 p-1 rounded-full text-3xl'/><span className=' font-medium text-sm'>Processing</span></header>
                        <p className=' px-10'>Seller has received and processed order</p>
                        <p className=' px-10'>08/08/2023</p>
                      </section>
                      <section className=" text-gray-500 text-sm space-y-2">
                        <header  className=' text-black flex items-center gap-3'><TbCurrentLocation className=' bg-gray-200 p-1 rounded-full text-3xl'/><span className=' font-medium text-sm'>IPC Center</span></header>
                        <p className=' px-10'>Item processed and departs IPC center</p>
                        <p className=' px-10'>07/08/2023</p>
                      </section>
                      <section className=" text-gray-500 text-sm space-y-2">
                        <header  className=' text-black flex items-center gap-3'><FaShippingFast className=' bg-gray-200 p-1 rounded-full text-3xl'/><span className=' font-medium text-sm'>Shipping</span></header>
                        <p className=' px-10'>Item processed and departs IPC center</p>
                        <p className=' px-10'>--/--/----</p>
                      </section>
                      <section className=" text-gray-500 text-sm space-y-2">
                        <header  className=' text-black flex items-center gap-3'><IoCheckboxOutline className=' bg-gray-200 p-1 rounded-full text-3xl'/><span className=' font-medium text-sm'>Delivered</span></header>
                        <p className=' px-10'>Item processed and departs IPC center</p>
                        <p className=' px-10'>--/--/----</p>
                      </section>
                    </div>
                  </div>
                </>
              )
            })
          }
        </main>
      </div>
    </React.Fragment>
  )
}

export default SellerOrder