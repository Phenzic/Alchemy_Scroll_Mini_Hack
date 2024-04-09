import React from 'react'
import { Outlet } from 'react-router'

const SellerRootLayout = () => {
  return (
    <React.Fragment>
      <div>
        <header>
          
        </header>
        <main>

        </main>
        <section>
          <Outlet/>
        </section>

      </div>
    </React.Fragment>
  )
}

export default SellerRootLayout