import React from 'react'
import { Outlet } from 'react-router'
import SellerHeader from './SellerHeader'

const SellerRootLayout = () => {
  return (
    <React.Fragment>
      <div className=' bg-gray-100'>
        <header>
          <SellerHeader/>
        </header>
        {/* <main>

        </main> */}
        <section>
          <Outlet/>
        </section>
      </div>
    </React.Fragment>
  )
}

export default SellerRootLayout