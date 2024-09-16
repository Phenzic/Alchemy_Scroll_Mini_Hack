import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import { totalUsers } from "../../utils/firebase";
import {ClipLoader} from "react-spinners"

const Vendors = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([])

  useEffect(function(){
    const gettingVendors = async function(){
      const users = await totalUsers()
      const vendor = users.filter(function(vendor){
        return vendor.userRole==="seller"
      })
      setVendors(vendor)
      // console.log(vendor);
    }

    gettingVendors()
  },[])

  return (
    <>
      <div className=" w-full grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-lg:grid-cols-1">
        {vendors.length===0?<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <ClipLoader />
          <p>Loading Product Details</p>
        </div>:vendors.map((eachVendor) => {
            return (
              <div
                className="bg-white border cursor-pointer rounded-lg p-5 flex flex-col items-center"
                key={eachVendor.uid}
              >
                <img
                  src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                  className="w-20 h-20 text-large object-cover rounded-full mb-2"
                />
                <h1 className=" capitalize font-semibold">{eachVendor.businessName}</h1>
                <p className="text-sm opacity-70">{eachVendor.email}</p>
                <button
                  onClick={() => navigate(`${eachVendor.uid}`)}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#305c45] px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#305c45ce] focus:outline-none focus:ring-2 focus:ring-[#305c45b5] focus:ring-offset-2 sm:w-full sm:flex-grow-0 mt-5"
                >
                  View Vendor Details
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Vendors;
