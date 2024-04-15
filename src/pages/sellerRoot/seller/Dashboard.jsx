import React from 'react'
import { productData } from '../../../utils/testData'
import Pagination from "../../../components/pagination/Pagination"
import { PieChat } from '../../../components/charts/PieChat'
import BarChat from "../../../components/charts/BarChat"
import SellerInfo from '../SellerInfo'

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="  bg-gary-100 mx-2 px-2 mt-3 py-5 rounded-md">
        {/* SELLER INFO  */}
        <section>
          <SellerInfo/>
        </section>
        
        {/* WHERE DASHBOARD ANALYTICS WOULD BE */}
        <div className="flex gap-10 overflow-hidden justify-between bg-white p-4 py-6 rounded-2xl w-[100%] h-fit border overflow-x-auto max-lg:flex-col max-lg:items-center">
          <BarChat />
          <PieChat />
      </div><br />
        
          {/* SELLER DATA */}
        <div className=' bg-white px-3 py-4 rounded-md'>
          <main className='  pb-8'>
            <header className=' flex justify-between text-sm items-center'>
              <h1 className=" font-sans font-semibold text-slate-600">Recent orders</h1>
              <button className=' border-[2px] px-2 py-1 font-sans rounded-md text-gray-400'>Export CSV</button>
            </header>
          </main>
          {/* MAPPING THROUGH THE FAKE API TO GET TITLE AND PRICES INORDER TO DISPLAY */}
          {/* MOBILE VIEW OF SELLERS PAGE */}
          <div className=' sm:hidden flex flex-col gap-2'>
            {
              productData.slice(0,5).map((eachProduct)=>{
                return(
                  <div key={eachProduct.id} className=' rounded-md py-2 border-2 px-5 flex flex-col gap-5'>
                    <h1 className=' text-sm text-black font-semibold font-sans'>{eachProduct.title.slice(0,15)}...</h1>
                    
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
          {/* DESKTOP VIEW OF SELLERS PAGE */}
          <div className=' max-sm:hidden  overflow-auto'>
            <table className="  w-full  text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr className=''>
                  <th scope={'col'} className=' px-10 py-5'>Items</th>
                  <th scope={'col'} className=' px-5 py-5'>Price (₦)</th>
                  <th scope={'col'} className=' px-10 py-5'>Quantity</th>
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
                        <td className="px-12 py-4">{Math.floor(Math.random()*5)+1}</td>
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

export default Dashboard