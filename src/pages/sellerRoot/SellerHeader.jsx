import React, { useState } from 'react'
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
  const [navTrigger, setNavTrigger] = useState(false)

  const handleNavbarTrigger = function(){
    setNavTrigger(!navTrigger)
  }
  const handleClose=function(){
    setNavTrigger(false)
  }
  return (
    <React.Fragment>
        {/* Mobile View , Navigation Bar Seller Header Section */}
        <section>
          <SideBar closeNavigation={handleClose} trigger={navTrigger}/>
        </section>
        <div className=' md:bg-black bg-white'>
          <header className=' md:hidden items-center flex justify-between px-3 py-5 '>
            <p className=' text-sm font-medium font-sans text-slate-700'>Dashboard</p>
            <aside className='items-center flex gap-3 '>
              <IoIosSearch className=' text-2xl text-slate-700' />
              <div className={`flex ${navTrigger?"-z-10":'z-10'}  items-end flex-col gap-1 cursor-pointer`} onClick={handleNavbarTrigger}>
                <motion.span
                  variants={{
                    initial:{
                      rotate:0,
                      x:0
                    },
                    final:{
                      rotate:45,
                      y:6
                    },
                    exit:{
                      rotate:0
                    }
                  }} transition={{
                    ease:'easeOut',
                    duration:0.1,
                    type:'spring'
                  }}  initial="initial" animate={navTrigger?'final':'exit'}
                className={` text-transparent bg-slate-700 ${navTrigger?'w-6':'w-5'} h-[3px]`}>.</motion.span>
                <motion.span

                variants={{
                  initial:{
                    opacity:1
                  },final:{
                    opacity:0
                  },exit:{
                    opacity:1
                  }
                }}
                initial="initial" animate={navTrigger?'final':'exit'}
                className=" text-transparent bg-slate-700 w-3 h-[3px]">.</motion.span>
                <motion.span 
                  variants={{
                    initial:{
                      rotat:0,
                    },final:{
                      rotate:-45,
                      y:-8
                    },exit:{
                      
                    }
                  }} transition={{
                    ease:'easeOut',
                    duration:0.1,
                    type:'spring'
                  }}
                  initial="initial" animate={navTrigger?'final':'exit'}
                className=" text-transparent bg-slate-700 w-6 h-[3px]">.</motion.span>
              </div>
            </aside>
          </header>
        </div>
        

    </React.Fragment>
  )
}

export default SellerHeader
