import React from 'react'
import { Outlet } from 'react-router'
import SellerHeader from './SellerHeader'

const SellerRootLayout = () => {
  return (
    <React.Fragment>
      <div className=' md:flex md:gap-2 bg-gray-100'>
        <header className='md:w-1/4 md:h-9'>
          <SellerHeader/>
        </header>
        <section className=' md:overflow-auto md:w-3/4'>
          <div className='  bg-white'>
            <header className=' items-center flex justify-between px-3 py-5 '>
              <p className=' md:text-2xl font-medium font-sans text-slate-700'>Dashboard</p>
              {/* <aside className='items-center flex gap-3 '>
                <div className={`flex   items-end flex-col gap-1 cursor-pointer`} >
                
                </div>
              </aside> */}
            </header>
          </div>
          <Outlet/>
        </section>
      </div>
    </React.Fragment>
  )
}

export default SellerRootLayout