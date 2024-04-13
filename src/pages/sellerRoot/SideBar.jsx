/* eslint-disable react/prop-types */
import React from 'react'
import logo from "../../assets/logo.png"
import { NavLink, useLocation } from 'react-router-dom'
import {BsPerson} from "react-icons/bs"
import {IoBagCheckOutline} from "react-icons/io5"
import {CiShop,CiWallet} from "react-icons/ci"
import {motion} from "framer-motion"



function SideBar({trigger,closeNavigation}) {
  const seller_pages = [
    {icon:<BsPerson/>,page:'dashboard'},
    {icon:<IoBagCheckOutline/>,page:'orders'},
    {icon:<CiShop/>,page:'products'},
    {icon:<CiWallet/>,page:'wallet'}
  ]

  const location = useLocation()
  const current_url = location.pathname.split('/')[2];
  return (
    <React.Fragment>
      {/* Mobile View Seller Navigation Bar */}
      <motion.div
        variants={{
          initial:{
            x:-1000
          },final:{
            x:0,
            transition:{
              duration:0.2
            }
          },exit:{
            x:-1000,
            transition:{
              duration:0.2
            }
          }
        }}  initial="initial" animate={trigger?'final':'exit'}
      className={` md:hidden flex flex-col gap-5 px-5 py-4 fixed bg-gray-50 w-full h-screen`}>
        <section className=' flex items-center gap-5 '>
          <p onClick={closeNavigation} className=' cursor-pointer text-3xl font-light'>×</p>
          <img src={logo} className=' w-36' alt="JAMAZAN logo" />
        </section>
        <main className=' flex flex-col gap-5'>
          {
            seller_pages.map(function(eachPage,index){
              return(
                <NavLink to={`${eachPage.page}`} key={index}>
                  <div onClick={closeNavigation} className={` sm:py-4 sm:my-2 flex items-center text-slate-700 gap-2 px-3 rounded-md py-3 ${current_url===eachPage.page?' border-l-[6px] bg-gray-200 border-green-800 ':' text-black'}`}>
                    <p className=' text-2xl'>{eachPage.icon}</p>
                    <p className=" sm:font-medium sm:text-lg text-sm text-slate-500 font-semibold capitalize">{eachPage.page}</p>
                  </div>
                </NavLink>
              )
            })
          }
        </main>
      </motion.div>
      {/* Desktop View Seller Header Section */}
      <div className='  max-md:hidden md:border-r-2 md:border-gray-300 md:h-full md:fixed md:w-1/4 md:px-3 md:py-7'>
        <section className=' flex items-center gap-5 pb-10'>
          <img src={logo} className=' w-36' alt="JAMAZAN logo" />
        </section>
        <main className=' flex flex-col gap-5'>
          {
            seller_pages.map(function(eachPage,index){
              return(
                <NavLink to={`${eachPage.page}`} key={index}>
                  <div onClick={closeNavigation} className={` flex items-center text-slate-700 gap-2 px-3 rounded-md md:py-5 md:my-1 py-3 ${current_url===eachPage.page?' border-l-[6px] bg-gray-200 border-green-800 ':' text-black'}`}>
                    <p className="md:text-3xl">{eachPage.icon}</p>
                    <p className=" md:text-xl md:font-medium text-sm text-slate-500 font-semibold capitalize">{eachPage.page}</p>
                  </div>
                </NavLink>
              )
            })
          }
        </main>
      </div>
    </React.Fragment>
  )
}

export default SideBar
