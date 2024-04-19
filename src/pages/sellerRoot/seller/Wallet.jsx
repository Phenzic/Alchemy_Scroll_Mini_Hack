import React from 'react'
import WalletCard from "../../../components/seller/WalletCard"
import {FaRegEdit} from "react-icons/fa"
import mastercard from "../../../assets/mastercardicon.png"
import Pagination from '../../../components/pagination/Pagination'
import { useNavigate } from 'react-router'
import Transactions from './Transactions'


const Wallet = () => {

  const navigate = useNavigate()
  
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
          {/* Edit Card  */}
          <section>
            <p className='font-semibold text-sm'>Cards</p>
            <div className=' border-[1px]  sm:py-5 pt-5 pb-3 rounded-lg'>
              <section className=' px-4 border-b-[1px] py-2 w-full flex justify-between items-center text-gray-800 text-sm'>
                <p className=' font-semibold'>Edit Card</p>
                <FaRegEdit/>
              </section>
              <div className=' flex flex-col px-4'>
                <section className=' flex items-center'>
                  <img src={mastercard} className=' w-6' alt="mastercard" />
                  <p className=' text-xs'>{"Samuel Sampson"}</p>
                </section>
                <section className=' flex items-center py-2 justify-between'>
                  <p className=' text-xs'>23124 **** **** 2340</p>
                  <p className=' bg-gray-200 text-gray-700 w-fit px-2 py-1 rounded-md text-xs '>Default</p>
                </section>
                <hr />
                <button onClick={function(){navigate("add-card")}} className=" self-end justify-end pt-2 text-green-700 font-semibold text-sm ">Add new Card</button>
              </div>
            </div>
          </section>
        </header>

        <br />

        {/* BOTTOM SECTION TRANSACTIONS COMPONENT*/}
        <Transactions/>
        
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