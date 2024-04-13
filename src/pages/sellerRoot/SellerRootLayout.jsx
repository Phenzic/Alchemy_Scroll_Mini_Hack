import React from 'react'
import { Outlet } from 'react-router'
import SellerHeader from './SellerHeader'
import {useLocation} from "react-router-dom"
import { split } from 'postcss/lib/list'

const SellerRootLayout = () => {

  const location = useLocation()
  const current_page = location.pathname.split("/")[2]

  return (
    <React.Fragment>
      <div className=' md:flex md:gap-2 bg-gray-100'>
        <header className='md:w-1/4 md:h-9'>
          <SellerHeader/>
        </header>
        <section className=' h-screen md:overflow-auto md:w-3/4'>
          <div className=' md:rounded-md bg-white  my-2'>
            <header className=' items-center flex justify-between px-3 py-5 '>
              <p className=' md:text-2xl font-medium font-sans text-slate-700 capitalize'>{current_page}</p>
            </header>
          </div>
          <Outlet/>
        </section>
      </div>
    </React.Fragment>
  )
}

export default SellerRootLayout