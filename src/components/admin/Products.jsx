import React, { useEffect, useState } from 'react'
import {getAllProducts, totalUsers} from "../../utils/firebase/index"
import {ClipLoader} from "react-spinners"

function Products() {
  
  const [products, setProducts] = useState([])

  useEffect(()=>{
    const fetchProducts = async ()=>{
      const [products, users] = await Promise.all([getAllProducts(),totalUsers()])
      const productAndUserId = products.map((eachProduct)=>{
        const id = users.filter((eachUserId)=>{
          if(eachProduct.sellerId == eachUserId.uid ){
            return eachUserId;
          }
        })
        return {sellerId:id[0].businessName,product:eachProduct}
      })
      setProducts(productAndUserId);
    }

    fetchProducts()

  },[])




  return (
    <React.Fragment>
        {
          products.length==0?<div className=' flex flex-col justify-center items-center py-2 '><ClipLoader/></div>:
          <div className=" w-full">
          <div className="relative overflow-x-auto border sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price($)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Seller
                  </th>
                  
                </tr>
                
              </thead>
              <tbody>
                {products.map((eachProduct) => {
                    return (
                      <tr key={eachProduct.product?.id+"#"}>
                        <td className="text-base min-[450px]:text-xs px-6 py-4">{eachProduct.product?.name}</td>
                        <td className="text-base min-[450px]:text-xs px-6 py-4">{eachProduct.product?.quantity}</td>
                        <td className="text-base min-[450px]:text-xs px-6 py-4">{eachProduct.product?.price}</td>
                        <td className="text-base min-[450px]:text-xs px-6 py-4">{eachProduct.product?.category}</td>
                        <td className="text-base min-[450px]:text-xs px-6 py-4">{eachProduct.product?.discountedPrice}</td>
                        <td className="text-base min-[450px]:text-xs px-6 py-4">{eachProduct.sellerId}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        }
    </React.Fragment>
  )
}

export default Products
