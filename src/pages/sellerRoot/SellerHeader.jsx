import React from 'react'
import {IoIosSearch} from "react-icons/io"
import {motion} from "framer-motion"
import SideBar from './SideBar'
// import {
//   Button,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Spinner,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
//   Tabs,
// } from "@nextui-org/react";


function SellerHeader() {
  return (
    <React.Fragment>
        {/* Mobile View Seller Header Section */}
        <section>
          {/* <SideBar/> */}
        </section>
        <div className=' bg-white'>
          <header className=' items-center flex justify-between px-3 py-5 '>
            <p className=' text-sm font-medium font-sans text-slate-700'>Dashboard</p>
            <aside className='items-center flex gap-3 '>
              <IoIosSearch className=' text-2xl text-slate-700' />
              <div className="flex items-end flex-col gap-1">
                <motion.span className=" text-transparent bg-slate-700 w-5 h-[3px]">.</motion.span>
                <motion.span className=" text-transparent bg-slate-700 w-3 h-[3px]">.</motion.span>
                <motion.span className=" text-transparent bg-slate-700 w-6 h-[3px]">.</motion.span>
              </div>
            </aside>
          </header>
        </div>
        

    </React.Fragment>
  )
}

export default SellerHeader
