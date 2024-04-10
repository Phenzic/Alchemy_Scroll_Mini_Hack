import React from 'react'
import logo from "../../assets/logo.png"
import {BsPerson,BsBarChart} from "react-icons/bs"
import {IoBagCheckOutline,IoBagOutline,IoSettingsOutline} from "react-icons/io5"
import {CiShop} from "react-icons/ci"
import {MdOutlinePersonPin} from "react-icons/md"
import {LiaUserFriendsSolid} from "react-icons/lia"
import {PiPaperPlaneRightThin} from "react-icons/pi"


function SideBar() {
  return (
    <React.Fragment>
      {/* Mobile View Seller Navigation Bar */}
      <div className=' flex flex-col gap-5 px-5 py-4 fixed bg-gray-50 w-full'>
        <section className=' flex items-center gap-5 '>
          <p className=' text-3xl font-light'>×</p>
          <img src={logo} className=' w-36' alt="JAMAZAN logo" />
        </section>
        <main className=' flex flex-col gap-5'>
          <div className=" flex items-center text-slate-700 gap-2 px-3 border-l-[6px] bg-gray-200 rounded-md py-3 border-green-800">
            <BsPerson className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Dashboard</p>
          </div>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <BsBarChart className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Analytics</p>
          </div>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <IoBagCheckOutline className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Orders</p>
          </div>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <CiShop className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Products</p>
          </div>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <LiaUserFriendsSolid className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Customers</p>
          </div>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <MdOutlinePersonPin className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Vendors</p>
          </div>
          <p className=' text-slate-500 font-medium text-sm'>SALES CHANNEL</p>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <PiPaperPlaneRightThin className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Integrations</p>
          </div>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <IoBagOutline className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">My Store</p>
          </div>
          <p className=' text-slate-500 font-medium text-sm'>OTHERS</p>
          <div className=" flex items-center text-slate-700 gap-2 px-3">
            <IoSettingsOutline className=' text-xl'/>
            <p className=" text-sm text-slate-500 font-semibold">Settings</p>
          </div>
        </main>
      </div>
      {/* Desktop View Seller Header Section */}
      <div>
        
      </div>
    </React.Fragment>
  )
}

export default SideBar
