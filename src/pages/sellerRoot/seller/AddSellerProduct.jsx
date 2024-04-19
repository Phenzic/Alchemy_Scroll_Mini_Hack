/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useNavigate } from 'react-router'
import {CiImageOn} from "react-icons/ci"


function AddSellerProduct() {
    const navigate = useNavigate()
  return (
    <React.Fragment>
       <div>
          <button className=' text-lg font-bold' onClick={()=>{navigate(-1)}}>←</button>
          <main className=' space-y-5'>
            <section className=' min-[450px]: sm: bg-white px-2 py-4 rounded-md space-y-6'>
                <label htmlFor="" className=' flex flex-col gap-2'>
                    <p className=' text-sm font-medium text-gray-700'>Product Name</p>
                    <input type="text" placeholder='Enter product name' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2' name="name" id="" />
                </label>
                <label htmlFor="" className=' flex flex-col gap-2'>
                    <p className=' text-sm font-medium text-gray-700'>Product Description</p>
                    <textarea name="description" id=""  rows="5" placeholder='Enter product description' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2'/>
                </label>
                <label htmlFor="" className=' flex flex-col gap-2'>
                    <p className=' text-sm font-medium text-gray-700'>Other Information</p>
                    <textarea name="information" id=""  rows="5" placeholder='Enter other product information' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2'/>
                </label>
            </section>
            <section className=' space-y-2 bg-white px-2 py-4 rounded-md'>
                <p className=' text-xs  min-[450px]:text-sm font-semibold'>Product Media &nbsp; <span className=' text-[10px] min-[450px]:text-sm text-gray-500'>"Minium of 2 images must be added"</span></p>
                <p className=' text-xs min-[450px]:text-sm text-gray-700 font-semibold py-2'>Product Photos</p>
                <div className=' bg-gray-100 gap-5 border-gray-400 border-dashed rounded-xl p-5 border-[2px] flex flex-col items-center justify-center'>
                    <section className='  gap-10 flex text-6xl justify-around'>
                        <CiImageOn/>
                        <CiImageOn/>
                    </section>
                    <p className=' min-[450px]:text-sm text-xs font-semibold text-gray-500'>Drag and drop images or click to upload</p>
                    <button className=' border-[1px] border-green-800 px-5 py-1 text-green-800 rounded-md'>Upload image</button>
                    <p className=' min-[450px]:text-sm text-xs font-semibold text-gray-500'>*Only PNG and JPEG files are allowed</p>
                </div>
            </section>
            <section className=' space-y-3  bg-white px-2 py-4 rounded-md'>
                <p className=' min-[450px]:text-sm text-xs font-semibold'>Pricing</p>
                <main className='  space-y-3 md:grid md:grid-cols-4 md:justify-between md:items-center'>
                    <label htmlFor="" className=' col-span-4 flex flex-col gap-1'>
                        <p className=' min-[450px]:text-sm text-xs font-semibold'>Base Price &nbsp; <span className=' text-[10px] text-gray-500'>*Price before discount</span></p>
                        <aside className='flex items-center border-[1px] border-gray-300 rounded-md py-1 px-2 divide-x-2'>
                            <p className=' pr-2 text-gray-500'>₦</p>
                            <input type={"number"} placeholder='Enter base price' className=' placeholder:text-sm  px-2 w-full col-span-2 outline-none  bg-white ' name="name" id="" />
                        </aside>
                    </label>
                    <label htmlFor="" className=' md:mr-5 md:col-span-2 flex flex-col gap-1'>
                        <p className=' min-[450px]:text-sm text-xs font-semibold'>Discount Type</p>
                        <select name="" id="" className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500'>
                            <option value="">Select discount type</option>
                        </select>
                    </label>
                    <label htmlFor="" className=' md:mr-5 md:col-span-2 flex flex-col gap-1'>
                        <p className=' min-[450px]:text-sm text-xs font-semibold '>Discount Percentage</p>
                        <aside className='flex items-center border-[1px] border-gray-300 rounded-md py-1 px-2 divide-x-2'>
                            <input type="number" placeholder='7%' className='  px-2 w-full col-span-2 outline-none  bg-white ' name="name" id="" />
                            <p className=' px-2 text-xs'>₦5,500</p>
                        </aside>
                    </label>
                </main>
            </section>
            <section className='space-y-2 md:flex md:flex-col bg-white px-2 py-4 rounded-md'>
                <p className='min-[450px]:text-base text-sm font-semibold'>Inventory</p>
                <main className=' md:grid md:grid-cols-2 md:gap-5 md:items-center md:space-y-0 space-y-3'>
                    <label htmlFor="" className=' flex flex-col gap-1'>
                        <p className='min-[450px]:text-sm text-xs font-medium text-gray-700'>Product SKU</p>
                        <input type="text" placeholder='Enter product SKU' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2' name="sku" id="" />
                    </label>
                    <label htmlFor="" className=' flex flex-col gap-1'>
                        <p className='min-[450px]:text-sm text-xs font-medium text-gray-700'>Product Quantity</p>
                        <input name="quantity"  placeholder='Enter product quantity' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2'/>
                    </label>  
                </main>
            </section>
            <section className=' flex flex-col space-y-3 bg-white px-2 py-4 rounded-md'>
                <p className=' text-base font-semibold'>Variation</p>
                <main className=' space-y-5'>
                    <label htmlFor="" className=' text-xs flex flex-col gap-2'>
                        <p className='min-[450px]:text-sm  font-semibold'><span className=' text-xs'>Variation Type &nbsp;| &nbsp;<span className=" text-yellow-400">Remove</span></span></p>
                        <select name="" id="" className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500'>
                            <option value="">Color</option>
                            <option value="">Dimension</option>
                        </select>
                        <p className='min-[450px]:text-sm font-medium text-gray-700'>Variation</p>
                        <input type="text" placeholder='Color' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2' name="name" id="" />
                    </label>
                    <label htmlFor="" className='min-[450px]:text-sm text-xs flex flex-col gap-2'>
                        <p className='  font-semibold'><span className=' text-xs'>Variation Type &nbsp;| &nbsp;<span className=" text-yellow-400">Remove</span></span></p>
                        <select name="" id="" className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500'>
                            <option value="">Color</option>
                            <option value="">Dimension</option>
                        </select>
                        <p className='min-[450px]:text-sm font-medium text-gray-700'>Variation</p>
                        <input type="text" placeholder='Color' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2' name="name" id="" />
                    </label>
                    <label htmlFor="" className='min-[450px]:text-sm text-xs flex flex-col gap-2'>
                        <p className='  font-semibold'><span className=' text-xs'>Variation Type &nbsp;| &nbsp;<span className=" text-yellow-400">Remove</span></span></p>
                        <select name="" id="" className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500'>
                            <option value="">Color</option>
                            <option value="">Dimension</option>
                        </select>
                        <p className='min-[450px]:text-sm font-medium text-gray-700'>Variation</p>
                        <input type="text" placeholder='Dimensions' className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2' name="name" id="" />
                    </label>
                </main>
                <button className=' self-end border-[1px] border-green-800 text-sm px-5 py-1 text-green-800 rounded-md'>Add Variation</button>
            </section>
            <section className=' space-y-2 bg-white px-2 py-4 rounded-md'>
                <p className='min-[450px]:text-base text-sm font-semibold'>Product Media</p>
                <main className=' space-y-3'>
                    <label htmlFor="" className=' flex flex-col gap-1'>
                        <p className='min-[450px]:text-sm text-xs font-semibold'>Product Category</p>
                        <select name="" id="" className=' outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500'>
                            <option value="">Select Category</option>
                        </select>

                    </label>
                    <label htmlFor="" className=' flex flex-col gap-1'>
                        <p className='min-[450px]:text-sm text-xs font-semibold'>Product Tags</p>
                        <input type={"text"} placeholder='Enter base price' className='border-[1px] border-gray-300 rounded-md placeholder:text-sm py-1 px-2 w-full col-span-2 outline-none  bg-white ' name="name" id="" />
                    </label>
                </main>
            </section>
            <section className=' bg-white px-2 py-4 space-y-2 rounded-md'>
                <p className='min-[450px]:text-base text-sm font-semibold'>Shipping</p>
                <main className=' space-y-3'>
                    <label htmlFor="" className=' flex flex-col gap-2'>
                        <p className=' min-[450px]:text-sm text-xs font-medium text-gray-700'>Product Weight</p>
                        <input type="text" placeholder='Kg' className=' placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2' name="name" id="" />
                    </label>
                    <label htmlFor="" className=' flex flex-col gap-2'>
                        <p className=' min-[450px]:text-sm text-xs font-medium text-gray-700'>Product Height</p>
                        <input name="description" id="" placeholder='Cm' className=' placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2'/>
                    </label>
                    <label htmlFor="" className=' flex flex-col gap-2'>
                        <p className=' min-[450px]:text-sm text-xs font-medium text-gray-700'>Product Width</p>
                        <input name="information" id="" placeholder='Cm' className=' placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2'/>
                    </label>
                    <label htmlFor="" className=' flex flex-col gap-2'>
                        <p className=' min-[450px]:text-sm text-xs font-medium text-gray-700'>Product Length</p>
                        <input name="information" id="" placeholder='Cm' className=' placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2'/>
                    </label>
                </main>
            </section>
            <section className=' md:justify-end md:gap-10 flex justify-between bg-white px-2 py-4 rounded-md'>
                <button className=' self-end border-[1px] border-yellow-600 text-sm px-5 py-2 text-yellow-600 rounded-md'>Cancel</button>
                <button className=' self-end border-[1px]  text-sm px-5 py-2 text-white bg-green-800 rounded-md'>Create Product</button>
            </section>
          </main>
       </div>
    </React.Fragment>
  )
}

export default AddSellerProduct