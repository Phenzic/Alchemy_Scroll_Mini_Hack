import React, { useState } from 'react'
import WalletCard from "../../../components/seller/WalletCard"
import {FaRegEdit} from "react-icons/fa"
import mastercard from "../../../assets/mastercardicon.png"
import { productData } from '../../../utils/testData'
import Pagination from '../../../components/pagination/Pagination'

const months = ["January","February","March","April","May","June",
"July","August","September","October","November","December"]

const options = [
  {
    text: "All",
    url: "/all",
  },
  {
    text: "Withdrawl",
    url: "/withdrawl",
  },
  {
    text: "Credit",
    url: "/credit",
  }
];
const Wallet = () => {

  const [active, setactive] = useState(0);

  
  return (
    <React.Fragment>
      <div className=' rounded-md bg-white px-2 py-3 mx-3'>
        {/* TOP SECTION FOR SELLER WALLET */}
          <section className=' border-b-2 py-2 px-2 items-center gap-3 text-sm flex justify-between'>
            <p className=' text-black '>My wallet</p>
            <p className=' text-gray-500'>Transactions: 30</p>
          </section>
        <header className=' md:grid md:grid-cols-2 md:gap-10 md:items-center'>
          <section className=' sm:py-2'>
            <WalletCard name={"Samuel Sampson"}/>
          </section>
          <section>
            <p className='font-semibold text-sm'>Cards</p>
            <div className=' border-[1px]  sm:py-5 py-8 rounded-lg'>
              <section className=' px-4 border-b-[1px] py-2 w-full flex justify-between items-center text-gray-800 text-sm'>
                <p className=' font-semibold'>Edit Card</p>
                <FaRegEdit/>
              </section>
              <div className=' px-4'>
                <section className=' flex items-center'>
                  <img src={mastercard} className=' w-6' alt="mastercard" />
                  <p className=' text-xs'>{"Samuel Sampson"}</p>
                </section>
                <section className=' flex items-center justify-between'>
                  <p className=' text-xs'>23124 **** **** 2340</p>
                  <p className=' bg-gray-200 text-gray-700 w-fit px-2 py-1 rounded-md text-xs '>Default</p>
                </section>
              </div>
            </div>
          </section>
        </header>

        <br />

        <div className=' md:text-base text-xs space-y-4 font-semibold'>
          <h1>Transaction History</h1>
          <div className=' flex justify-between'>
          <select   className=' text-gray-500 font-light   outline-none border-2 py-1 px- rounded-lg'>
              <option value="">All</option>
              <option value="">Withdrawl</option>
              <option value="">Credit</option>
            </select>
            <aside className=' space-x-2'>
              <select className=' text-gray-500 font-light   outline-none border-2 py-1 px- rounded-lg' name="" id="">
                {
                  months.map(function(eachMonth,index){
                    return(
                      <option value="" key={index+'1'}>{eachMonth}</option>
                    )
                  })
                }
              </select>
              <button className=' border-[2px] px-2 py-1 font-sans rounded-md text-gray-500'>Export </button>
            </aside>
          </div>
        </div>

        <main>
           {/* MOBILE VIEW OF SELLERS WITHDRAWL PAGE */}
          <div className=' mt-8 sm:hidden flex flex-col gap-2'>
              {
                productData.slice(0,5).map((eachProduct)=>{
                  return(
                    <div key={eachProduct.id} className=' rounded-md py-2 border-2 px-5 flex flex-col gap-5'>
                      <h1 className=' text-sm text-black font-semibold font-sans'>{eachProduct.title.slice(0,15)}...</h1>
                      
                      <div className=' border-t-[1px] flex flex-col gap-3 py-4'>
                        <section className='flex justify-between text-sm text-gray-700'>
                          <p>Amount(₦)</p>
                          <p>{eachProduct.price}</p>
                        </section>
                        <section className='flex justify-between text-sm text-gray-700'>
                          <p>Type</p>
                          <p>{Math.floor(Math.random()*2)==0?<span >Credit</span>:<span >Debit</span>}</p>
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
            {/* DESKTOP VIEW OF SELLERS WITHDRAWL PAGE */}
           <div className="px-2 py-5 border-2 my-10 max-sm:hidden  rounded-md bg-white gap-5 flex flex-col">
              <div className="flex justify-start gap-5 border-b border-b-black/10">
                {options?.map((_, i) => (
                  <p className={`${
                      active === i
                        ? "text-[#305C45] border-b-[#305C45]"
                        : "text-black/40"
                    } px-1 pb-3 border-b-transparent 
                    hover:text-[#305C45] text-sm  border-b-4 rounded-b-md cursor-pointer`}
                    key={_.text}
                    onClick={() => setactive(i)}
                  >
                    {_.text}
                  </p>
                ))}

              </div>
              <div className=' max-sm:hidden  overflow-auto'>
                <table className="  w-full  text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr className=''>
                      <th scope={'col'} className=' px-10 py-5'>Items</th>
                      <th scope={'col'} className=' px-5 py-5'>Amount (₦)</th>
                      <th scope={'col'} className=' px-10 py-5'>Type</th>
                      <th scope={'col'} className=' px-10 py-5'>Status</th>
                      <th scope={'col'} className=' px-5 py-5'>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productData.slice(0,5).map(function(eachProduct){
                        return(
                          <tr key={eachProduct.id} className="bg-white border-b  hover:bg-gray-50 ">
                            <td className="px-10 py-4">{eachProduct.title.slice(0,10)}...</td>
                            <td className="px-5 py-4">{eachProduct.price}</td>
                            <td className="px-10 py-4">{Math.floor(Math.random()*2)==0?<span >Credit</span>:<span >Debit</span>}</td>
                            <td className="px-10 py-4">{Math.floor(Math.random()*2)==0?<span className=' text-yellow-400'>Pending</span>:<span className=' text-green-400'>Completed</span>}</td>
                            <td className="px-5 py-4">16/07/2023</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          
        </main>
        <section className=' py-5' >
            <select name="" className=' sm:hidden outline-none border-2 font-semibold text-slate-700 py-1 px-1 rounded-lg' id="">
              <option value="">5 per page</option>
              <option value="">10 per page</option>
            </select>
            <section className=' max-sm:hidden'>
              <Pagination/>
            </section>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Wallet