import React from 'react'

function Products() {
  return (
    <React.Fragment>
        <div className=' w-full'>
            <div className='relative overflow-x-auto  shadow-md sm:rounded-lg'>
                <table className='w-ful text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                        <tr>
                            <th scope={'col'} className="px-6 py-3">Products</th>
                            <th scope={'col'} className="px-6 py-3">Category</th>
                            <th scope={'col'} className="px-6 py-3">Stock</th>
                            <th scope={'col'} className="px-6 py-3">Price (₦)</th>
                            <th scope={'col'} className="px-6 py-3">Added</th>
                            <th scope={'col'} className="px-6 py-3">Seller</th>
                            <th scope={'col'} className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(10)
                        .fill()
                        .map((_, key) => {
                        return (
                            <tr
                            className="bg-white border-b  hover:bg-gray-50 "
                            key={key}
                            >
                                <td className="px-6 py-4">Luxury female handbag</td>
                                <td className="px-6 py-4">3,000</td>
                                <td className="px-6 py-4">x1</td>
                                <td className="px-6 py-4">7,000</td>
                                <td className="px-6 py-4">Fashion</td>
                                <td className="px-6 py-4">Glorious Store</td>
                                <td className="px-6 py-4">View →</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Products
