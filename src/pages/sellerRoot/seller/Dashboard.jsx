import React from 'react'
import { productData } from '../../../utils/testData'
// import {
//   Button,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   // Spinner,
//   // Tab,
//   // Table,
//   // TableBody,
//   // TableCell,
//   // TableColumn,
//   // TableHeader,
//   // TableRow,
//   // Tabs,
// } from "@nextui-org/react";
// import { IoChevronDownOutline } from "react-icons/io5";


const Dashboard = () => {
  return (
    <React.Fragment>
      <div className=" bg-white mx-2 px-2 mt-3 py-5 rounded-md">
        <section>
          {/* WHERE DASHBOARD ANALYTICS WOULD BE */}
        </section>
        <main className=' pb-8'>
          <header className=' flex justify-between text-sm items-center'>
            <h1 className=" font-sans font-semibold text-slate-600">Recent orders</h1>
            <button className=' border-[2px] px-2 py-1 font-sans rounded-md text-gray-400'>Export CSV</button>
          </header>
        </main>
        {/* MAPPING THROUGH THE FAKE API TO GET TITLE AND PRICES INORDER TO DISPLAY */}
        <div className=' flex flex-col gap-2'>
          {
            productData.slice(0,5).map((eachProduct)=>{
              return(
                <div key={eachProduct.id} className=' rounded-md py-2 border-2 px-5 flex flex-col gap-5'>
                  <h1 className=' text-sm text-black font-semibold font-sans'>{eachProduct.title}</h1>
                  
                  <div className=' border-t-[1px] flex flex-col gap-3 py-4'>
                    <section className='flex justify-between text-sm text-gray-700'>
                      <p>Price(₦)</p>
                      <p>{eachProduct.price}</p>
                    </section>
                    <section className='flex justify-between text-sm text-gray-700'>
                      <p>Quantity</p>
                      <p>{Math.floor(Math.random()*5)+1}</p>
                    </section>
                    <section className='flex justify-between text-sm text-gray-700'>
                      <p>Status</p>
                      <p>{Math.floor(Math.random()*2)==0?<span className=' text-yellow-400'>Pending</span>:<span className=' text-green-400'>Completed</span>}</p>
                    </section>
                    <section className='flex justify-between text-sm text-gray-700'>
                      <p>Date</p>
                      <p>16/07/2023</p>
                    </section>
                  </div>
                </div>
              )

            })
          }
        </div>
        <section className=' py-5' >
        {/* <Dropdown>
            <DropdownTrigger>
              <Button className="text-mamiblack-600" variant="bordered">
                <p>Last 7 days</p>
                <IoChevronDownOutline />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="7">Last 7 days</DropdownItem>
              <DropdownItem key="6">Last 6 days</DropdownItem>
              <DropdownItem key="5">Last 5 days</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <select name="" className=' outline-none border-2 font-semibold text-slate-700 py-1 px-1 rounded-lg' id="">
            <option value="">5 per page</option>
            <option value="">10 per page</option>
          </select>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Dashboard