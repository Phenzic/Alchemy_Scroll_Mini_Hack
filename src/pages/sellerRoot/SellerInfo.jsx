import React from 'react'

function SellerInfo() {
  return (
    <React.Fragment>
        <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 px-1 gap-5  '>
            <div className="p-5 border flex-col  bg-white w-full rounded-2xl">
                <p className="text-neutral-400 text-base font-normal mb-3">Total sales</p>
                <h1 className="text-neutral-700 sm:text-[20px] text-[24px] md:text-[26px] font-medium mb-3">$ 185,700</h1>
                <p className="text-neutral-700 text-xs font-normal leading-tight inline-flex gap-2 items-center">
                    <span className="px-3 py-1 text-[#0d0d0d] bg-[#305c4523] rounded-3xl font-medium sm:text-[12px]">4.8%</span>from yesterday
                </p>
            </div>
            <div className="p-5 border flex-col  bg-white w-full rounded-2xl">
                <p className="text-neutral-400 text-base font-normal mb-3">Total sales</p>
                <h1 className="text-neutral-700 sm:text-[20px] text-[24px] md:text-[26px] font-medium mb-3">$ 185,700</h1>
                <p className="text-neutral-700 text-xs font-normal leading-tight inline-flex gap-2 items-center">
                    <span className="px-3 py-1 text-[#0d0d0d] bg-[#305c4523] rounded-3xl font-medium sm:text-[12px]">4.8%</span>from yesterday
                </p>
            </div>
            <div className="p-5 border flex-col  bg-white w-full rounded-2xl">
                <p className="text-neutral-400 text-base font-normal mb-3">Total sales</p>
                <h1 className="text-neutral-700 sm:text-[20px] text-[24px] md:text-[26px] font-medium mb-3">$ 185,700</h1>
                <p className="text-neutral-700 text-xs font-normal leading-tight inline-flex gap-2 items-center">
                    <span className="px-3 py-1 text-[#0d0d0d] bg-[#305c4523] rounded-3xl font-medium sm:text-[12px]">4.8%</span>from yesterday
                </p>
            </div>
        </div>
      <br />
    </React.Fragment>
  )
}

export default SellerInfo
