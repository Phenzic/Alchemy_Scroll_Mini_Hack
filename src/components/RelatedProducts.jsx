/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {getAllProducts} from "../utils/firebase/index";
import { Link } from "react-router-dom";


function RelatedProducts({category,id}) {
    const [products, setProducts] = useState([])
    
    const fetchProducts = async ()=>{
        const products = await getAllProducts();
        const getSimilarCategory = products.filter((eachProduct)=> {
            if(eachProduct.category==category && eachProduct.id != id){
                return eachProduct;
            }
        });
        setProducts(getSimilarCategory);
        console.log(getSimilarCategory);
    }
    
    useEffect(()=>{
        fetchProducts()
    },[])
    return (
    <div>
      <div className=" border-[1px] border-gray-200 rounded-lg px-5 py-3 grid  grid-cols-2 md:grid-cols-3">
        {
            products.map((product)=>{
                return (
                    <div key={product.id} className="  gap-2 flex flex-col items-center">
                        <img src={product.imageUrls[0].url} alt={product.name} className=" w-44"/>
                        <div className=" flex flex-col gap-1">
                            <p className="  text-xs">{product.name.length>10?product.name.slice(0,15)+"...":product.name}</p>
                            <p className="font-semibold text-[12x]">{product.price}</p>
                            <p className=" text-[10px]">{product.discountedPrice}</p>
                        </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default RelatedProducts
