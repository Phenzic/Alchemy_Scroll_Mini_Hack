import React from 'react'
import {IoIosSearch} from "react-icons/io"
import product from "../../../assets/shirt1.jpeg"
import {CiEdit} from "react-icons/ci"
import {GoTrash} from "react-icons/go"
import Pagination from '../../../components/pagination/Pagination'
import { useNavigate } from 'react-router'

const Products = () => {
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <div className=' px-2'>
        <header className=' space-y-3'>
          <section className=' font-sans rounded-md py-1  items-center border-[1px] flex gap-5 px-2 border-gray-400'>
            <input type="text" placeholder='Search for product&apos;s name' className=" w-full outline-none placeholder:text-sm px-2 bg-transparent" name="" id="" />
            <IoIosSearch className=' text-xl'/>
          </section>
          <section className=' flex justify-between px-3 py-2'>
            <select   className=' text-gray-500 font-light   outline-none border-2 py-1 px-2 rounded-lg'>
                <option value="">Category</option>
                <option value="">A-Z</option>
            </select>
            <button className=" bg-green-800 px-4 font-light py-1 rounded-md text-white" onClick={function(){navigate(`new-product`)}}>Add new</button>
          </section>
        </header>


        <main className=' bg-white px-2 my-3 py-5 mx-2 rounded-md'>
          <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-x-2 gap-y-5'>
            {
              Array(10).fill().map(function(eachProduct,index){
                return(
                  <div key={index+"123"} className=" space-y-2 border-[1px] border-gray-300 rounded-md">
                    <img src={product} alt="" className=' w-full rounded-md'/>
                    <div className=' pb-4 px-2'>
                      <section className=' flex justify-between'>
                        <p className=' text-[10px]'>T-shirts</p>
                        <p className=' text-[10px]'>Sold:7</p>
                      </section>
                      <section className='pb-2 flex justify-between'>
                        <p className=' text-[10px]'>₦5,500</p>
                        <p className=' text-[10px]'>15 units left</p>
                      </section>
                      <div className=' flex sm:grid sm:grid-cols-2 flex-col gap-2'>
                        <button className=" border-[1px] flex items-center justify-center gap-2 font-sans text-sm rounded-md py-1 px-1 text-gray-600 border-gray-500">
                          <CiEdit/>
                          <span>Edit</span>
                        </button>
                        <button className=" text-yellow-500 border-[1px] flex items-center justify-center gap-2 font-sans text-sm rounded-md py-1 px-1 border-yellow-500">
                          <GoTrash/>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </main>
        <section className=' py-5' >
            <select name="" className=' sm:hidden outline-none border-2 font-semibold text-slate-700 py-1 px-1 rounded-lg' id="">
              <option value="">5 per page</option>
              <option value="">10 per page</option>
              <option value="">15 per page</option>
              <option value="">20 per page</option>
            </select>
            <section className=' max-sm:hidden'>
              <Pagination/>
            </section>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Products