import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import Products from "../../components/admin/Products";

const Vendor = () => {
  return (
    <section className="p-5 text-mamiblack">
      <h3 className="text-[24px] font-semibold ">Vendor Profile</h3>
      <p className="flex items-center gap-2 py-5 pt-0 max-md:text-sm">
        <Link to={-1}>Vendors</Link> <BsChevronRight />
        <span className="font-semibold">Pysavant Codes</span>
      </p>
      {/* {loading ? (
        <section className="h-[70vh] w-full flex items-center justify-center">
          <Spinner size="lg" label="Fetching vendor details..." />
        </section>
      ) : !loading && !vendorDetails ? (
        <section className="h-[70vh] w-full flex items-center justify-center">
          <h3>Cannot find vendor details</h3>
        </section>
      ) : ( */}
      <section className="grid grid-cols-3 gap-4 grid-flow-row-dense max-xl:grid-cols-2 max-lg:grid-cols-1">
        <div className="bg-white rounded-lg h-fit border">
          <div className="p-5 flex flex-col items-center justify-center">
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              className="w-24 h-24 text-large object-cover rounded-full mb-2 border"
            />
            <p className="text-[17px] mt-2">Pysavant Codes</p>
            <p className="text-sm opacity-60">uwakblessing1@gmail.com</p>
          </div>
          <div className="p-5 text-sm">
            <div className="w-full flex flex-wrap items-center justify-between mb-3">
              <p className="opacity-60">Store Name:</p>
              <p>Py Stores</p>
            </div>
            <div className="w-full flex flex-wrap items-center justify-between mb-3">
              <p className="opacity-60">Store Description:</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                pariatur sit tempora eos! Tempora vitae quo iusto quisquam
                voluptatem quas totam molestiae, officia, quasi magnam
                temporibus non eos nemo sequi.
              </p>
            </div>
            <div className="w-full flex flex-wrap items-center justify-between mb-3">
              <p className="opacity-60">Phone Number:</p>
              <p>+23479304858303</p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-between mb-3">
              <p className="opacity-60">Joined on:</p>
              <p>24th of November 2023</p>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => navigate(`${key}`)}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#F32013] px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#F32013] focus:outline-none focus:ring-2 focus:ring-[#F32013] focus:ring-offset-2 sm:w-full sm:flex-grow-0"
              >
                Restrict Vendor
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 h-fit border">
          <p className="text-[17px] font-medium">Wallet & Bank Details</p>
          <div className="w-full flex flex-wrap items-center justify-between mt-4 text-sm mb-3">
            <p className="opacity-60">Wallet Balance:</p>
            <p>$2,000</p>
          </div>
          <hr />
          <div className="w-full flex flex-wrap items-center justify-between mt-3 text-sm">
            <p className="opacity-60">Account Bank:</p>
            <p>Jamazan Bank</p>
          </div>
          <div className="w-full flex flex-wrap items-center justify-between mt-3 text-sm">
            <p className="opacity-60">Account Name:</p>
            <p>NIgga Bank</p>
          </div>
          <div className="w-full flex flex-wrap items-center justify-between mt-3 text-sm">
            <p className="opacity-60">Account Number:</p>
            <p>282884949938</p>
          </div>
          <div className="w-full flex flex-wrap items-center justify-between mt-3 text-sm">
            <p className="opacity-60">Account Type:</p>
            <p>NIgga</p>
          </div>
          <div className="w-full flex flex-wrap items-center justify-between mt-3 text-sm">
            <p className="opacity-60">Swift Code:</p>
            <p>283830</p>
          </div>
          <div className="w-full flex flex-wrap items-center justify-between mt-3 text-sm">
            <p className="opacity-60">Bank Branch:</p>
            <p>Jamaica</p>
          </div>
        </div>
      </section>
      <h3 className="text-[24px] font-semibold mt-10 mb-5">All Products</h3>
      <Products />
    </section>
  );
};

export default Vendor;