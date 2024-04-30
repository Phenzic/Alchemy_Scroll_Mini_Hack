/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";
import { SellerContext, useSeller } from "../../../context/SellerContext";

import spinner from "../../../assets/spinner.svg";

function AddSellerProduct() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const paramValue = params.get("param");

  const {
    categories,
    isLoading,
    setSelectedFiles,
    selectedFiles,
    productDetails,
    dragOver,
    resetFields,
    param,
    setProductDetails,
    getProductDetailsFromDatabase,
    variations,
    tagInputValue,
    tags,
    setTags,
    setVariations,
    handleFileSelect,
    enterTagEvent,
    handleTagChange,
    handleDragOver,
    handleDragLeave,
    handleVariationInputChange,
    handleAddVariation,
    handleProductDetailsInputChange,
    addProductToDatabase,
    handleDeleteItemsFromArray,
    handleDrop,
  } = useContext(SellerContext);

  React.useEffect(() => {
    getProductDetailsFromDatabase(paramValue);
  }, []);
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <img src={spinner} alt="spinner" className="animate-spin" />
        </div>
      ) : (
        productDetails && (
          <div>
            <button
              className=" text-lg font-bold"
              onClick={() => {
                navigate(-1);
                setProductDetails(resetFields);
              }}
            >
              ←
            </button>

            <main className=" space-y-5">
              {/* PRODUCT DETAILS */}
              <section className=" min-[450px]: sm: bg-white px-2 py-4 rounded-md space-y-6">
                <label htmlFor="" className=" flex flex-col gap-2">
                  <p className=" text-sm font-medium text-gray-700">
                    Product Name
                  </p>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className=" outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                    name="name"
                    value={productDetails.name}
                    onChange={handleProductDetailsInputChange}
                    id=""
                  />
                </label>
                <label htmlFor="" className=" flex flex-col gap-2">
                  <p className=" text-sm font-medium text-gray-700">
                    Product Description
                  </p>
                  <textarea
                    name="description"
                    value={productDetails.description}
                    onChange={handleProductDetailsInputChange}
                    id=""
                    rows="5"
                    placeholder="Enter product description"
                    className=" outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                  />
                </label>
                <label htmlFor="" className=" flex flex-col gap-2">
                  <p className=" text-sm font-medium text-gray-700">
                    Other Information
                  </p>
                  <textarea
                    name="otherInformation"
                    value={productDetails.otherInformation}
                    onChange={handleProductDetailsInputChange}
                    id=""
                    rows="5"
                    placeholder="Enter other product information"
                    className=" outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                  />
                </label>
              </section>

              {/* PRODUCT MEDIA */}
              <section className=" space-y-2 bg-white px-2 py-4 rounded-md">
                <p className=" text-xs  min-[450px]:text-sm font-semibold">
                  Product Media &nbsp;{" "}
                  <span className=" text-[10px] min-[450px]:text-sm text-gray-500">
                    "Minium of 2 images must be added"
                  </span>
                </p>
                <p className=" text-xs min-[450px]:text-sm text-gray-700 font-semibold py-2">
                  Product Photos
                </p>
                {param && param !== null ? (
                  <div className="gap-x-4 flex my-9 relative">
                    {productDetails.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="w-28 h-28 m-2 relative">
                            <div
                            onClick={() =>
                              handleDeleteItemsFromArray(
                                index,
                                setProductDetails
                              )
                            }
                            className="w-6 h-6 flex justify-center items-center rounded-full cursor-pointer  bg-green-500 absolute right-0 top-0"
                          >
                            <p className="font-bold mb-1">x</p>
                          </div>
                        
                        <img
                          src={imageUrl.url} // Set src to the URL created using URL.createObjectURL
                          alt={`Preview ${index}`}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative ${
                    dragOver ? "bg-green-800 [&>*]:text-white" : "bg-gray-100"
                  }  gap-5 border-gray-400 border-dashed rounded-xl p-5 border-[2px] flex flex-col items-center justify-center`}
                >
                  {selectedFiles && selectedFiles.length > 0 ? (
                    <div className="flex gap-x-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="w-28 h-28 m-2 relative">
                          <div
                            onClick={() =>
                              handleDeleteItemsFromArray(
                                index,
                                setSelectedFiles
                              )
                            }
                            className="w-6 h-6 flex justify-center items-center rounded-full cursor-pointer  bg-green-500 absolute right-0 top-0"
                          >
                            <p className="font-bold mb-1">x</p>
                          </div>
                          <img
                            src={URL.createObjectURL(file)} // Set src to the URL created using URL.createObjectURL
                            alt={`Preview ${index}`}
                            className="w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <section className=" gap-10 flex text-6xl justify-around">
                      <CiImageOn />
                      <CiImageOn />
                    </section>
                  )}

                  <p className=" min-[450px]:text-sm text-xs font-semibold text-gray-500">
                    Drag and drop images or click to upload
                  </p>
                  <input
                    id="uploaProductInput"
                    type="file"
                    onChange={handleFileSelect}
                    multiple
                    accept="image/jpeg, image/jpg, image/png"
                    hidden
                  />
                  <button
                    className=" border-[1px] border-green-800 px-5 py-1 text-green-800 rounded-md"
                    onClick={() =>
                      document.querySelector("#uploaProductInput").click()
                    }
                  >
                    Upload image
                  </button>

                  <p className=" min-[450px]:text-sm text-xs font-semibold text-gray-500">
                    *Only PNG and JPEG files are allowed
                  </p>
                </div>

                {/* <button onClick={() => handleImageUploadToStorageBucket()}>ADD IMAGES TO DB</button> */}
              </section>

              {/* PRICING */}
              <section className=" space-y-3  bg-white px-2 py-4 rounded-md">
                <p className=" min-[450px]:text-sm text-xs font-semibold">
                  Pricing
                </p>
                <main className="  space-y-3 md:grid md:grid-cols-4 md:justify-between md:items-center">
                  <label htmlFor="" className=" col-span-4 flex flex-col gap-1">
                    <p className=" min-[450px]:text-sm text-xs font-semibold">
                      Base Price &nbsp;{" "}
                      <span className=" text-[10px] text-gray-500">
                        *Price before discount
                      </span>
                    </p>
                    <aside className="flex items-center border-[1px] border-gray-300 rounded-md py-1 px-2 divide-x-2">
                      <p className=" pr-2 text-gray-500">₦</p>
                      <input
                        name="price"
                        value={productDetails.price}
                        onChange={handleProductDetailsInputChange}
                        type={"number"}
                        placeholder="Enter base price"
                        className=" placeholder:text-sm  px-2 w-full col-span-2 outline-none  bg-white "
                        id=""
                      />
                    </aside>
                  </label>
                  <label
                    htmlFor=""
                    className=" md:mr-5 md:col-span-2 flex flex-col gap-1"
                  >
                    <p className=" min-[450px]:text-sm text-xs font-semibold">
                      Discount Type
                    </p>
                    <select
                      name=""
                      id=""
                      className=" outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500"
                    >
                      <option value="">Select discount type</option>
                    </select>
                  </label>
                  <label
                    htmlFor=""
                    className=" md:mr-5 md:col-span-2 flex flex-col gap-1"
                  >
                    <p className=" min-[450px]:text-sm text-xs font-semibold ">
                      Discount Percentage(%)
                    </p>
                    <aside className="flex items-center border-[1px] border-gray-300 rounded-md py-1 px-2 divide-x-2">
                      <input
                        type="number"
                        placeholder="7%"
                        className="  px-2 w-full col-span-2 outline-none  bg-white "
                        name="discountRate"
                        value={productDetails.discountRate}
                        onChange={handleProductDetailsInputChange}
                        id=""
                      />
                      <p className=" px-2 text-xs">
                        ₦{productDetails.discountedPrice}
                      </p>
                    </aside>
                  </label>
                </main>
              </section>

              {/* INVENTORY */}
              <section className="space-y-2 md:flex md:flex-col bg-white px-2 py-4 rounded-md">
                <p className="min-[450px]:text-base text-sm font-semibold">
                  Inventory
                </p>
                <main className=" md:grid md:grid-cols-2 md:gap-5 md:items-center md:space-y-0 space-y-3">
                  <label htmlFor="" className=" flex flex-col gap-1">
                    <p className="min-[450px]:text-sm text-xs font-medium text-gray-700">
                      Product SKU
                    </p>
                    <input
                      type="text"
                      placeholder="Enter product SKU"
                      className=" outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                      name="productSku"
                      value={productDetails.productSku}
                      onChange={handleProductDetailsInputChange}
                      id=""
                    />
                  </label>
                  <label htmlFor="" className=" flex flex-col gap-1">
                    <p className="min-[450px]:text-sm text-xs font-medium text-gray-700">
                      Product Quantity
                    </p>
                    <input
                      name="quantity"
                      value={productDetails.quantity}
                      type="number"
                      onChange={handleProductDetailsInputChange}
                      placeholder="Enter product quantity"
                      className=" outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                    />
                  </label>
                </main>
              </section>

              {/* VARIATIONS */}
              <section className=" flex flex-col space-y-3 bg-white px-2 py-4 rounded-md">
                <p className=" text-base font-semibold">Variation</p>
                <main className=" space-y-5">
                  {variations && variations.length > 0
                    ? variations.map((variation, index) => (
                        <label
                          htmlFor={`variation-${index}`}
                          className="text-xs flex flex-col gap-2"
                          key={index}
                        >
                          <p className="min-[450px] text-sm font-semibold">
                            <span className="text-xs">
                              Variation Type &nbsp;| &nbsp;
                              <span
                                className="text-yellow-400"
                                onClick={() =>
                                  handleDeleteItemsFromArray(
                                    index,
                                    setVariations
                                  )
                                }
                              >
                                Remove
                              </span>
                            </span>
                          </p>
                          <select
                            name="type"
                            value={variation.type}
                            onChange={(e) =>
                              handleVariationInputChange(e, index, "type")
                            }
                            id={`variation-${index}`}
                            className="outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500"
                          >
                            <option value="">Select variation type</option>
                            <option value="Color">Color</option>
                            <option value="Dimension">Dimension</option>
                          </select>
                          <p className="min-[450px] text-sm font-medium text-gray-700">
                            Variation
                          </p>
                          <input
                            type="text"
                            placeholder={variation.type}
                            className="outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                            name="variation"
                            value={variation.variation}
                            onChange={(e) =>
                              handleVariationInputChange(e, index, "variation")
                            }
                            id={`variation-${index}`}
                          />
                        </label>
                      ))
                    : "No Variations Selected"}
                </main>
                <button
                  className=" self-end border-[1px] border-green-800 text-sm px-5 py-1 text-green-800 rounded-md"
                  onClick={() => handleAddVariation()}
                >
                  Add Variation
                </button>
              </section>

              {/* PRODUCT EXTRA DETAILS */}
              <section className=" space-y-2 bg-white px-2 py-4 rounded-md">
                <p className="min-[450px]:text-base text-sm font-semibold">
                  Product Extra Details
                </p>
                <main className=" space-y-3">
                  <label htmlFor="" className=" flex flex-col gap-1">
                    <p className="min-[450px]:text-sm text-xs font-semibold">
                      Product Category
                    </p>
                    <select
                      name="category"
                      value={productDetails.category}
                      id=""
                      onChange={handleProductDetailsInputChange}
                      className=" outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2 text-sm text-gray-500"
                    >
                      <option value="">Select Category</option>
                      {categories &&
                        categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label htmlFor="" className=" flex flex-col gap-1">
                    <p className="min-[450px]:text-sm text-xs font-semibold">
                      Product Tags
                    </p>
                    {tags && tags.length > 0 ? (
                      <div className="flex gap-x-2 gap-y-2 flex-wrap">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              handleDeleteItemsFromArray(index, setTags)
                            }
                            className="w-fit py-3 px-3 rounded-xl text-sm text-white flex justify-center items-center gap-x-5 h-7 bg-green-700"
                          >
                            <p>{tag}</p>
                            <p className="cursor-pointer mb-[0.12rem]">x</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}

                    <input
                      type={"text"}
                      placeholder="Enter base price"
                      className="border-[1px] border-gray-300 rounded-md placeholder:text-sm py-1 px-2 w-full col-span-2 outline-none  bg-white "
                      name="name"
                      id=""
                      value={tagInputValue}
                      onChange={handleTagChange}
                      onKeyUp={enterTagEvent}
                    />
                  </label>
                </main>
              </section>

              {/* SHIPPING */}
              <section className=" bg-white px-2 py-4 space-y-2 rounded-md">
                <p className="min-[450px]:text-base text-sm font-semibold">
                  Shipping
                </p>
                <main className=" space-y-3">
                  <label htmlFor="" className=" flex flex-col gap-2">
                    <p className=" min-[450px]:text-sm text-xs font-medium text-gray-700">
                      Product Weight
                    </p>
                    <input
                      type="number"
                      placeholder="Kg"
                      className=" placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                      name="productWeight"
                      value={productDetails.productWeight}
                      onChange={handleProductDetailsInputChange}
                      id=""
                    />
                  </label>
                  <label htmlFor="" className=" flex flex-col gap-2">
                    <p className=" min-[450px]:text-sm text-xs font-medium text-gray-700">
                      Product Height
                    </p>
                    <input
                      type="number"
                      name="productHeight"
                      value={productDetails.productHeight}
                      onChange={handleProductDetailsInputChange}
                      id=""
                      placeholder="Cm"
                      className=" placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                    />
                  </label>
                  <label htmlFor="" className=" flex flex-col gap-2">
                    <p className=" min-[450px]:text-sm text-xs font-medium text-gray-700">
                      Product Width
                    </p>
                    <input
                      type="number"
                      name="productWidth"
                      value={productDetails.productWidth}
                      onChange={handleProductDetailsInputChange}
                      id=""
                      placeholder="Cm"
                      className=" placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                    />
                  </label>
                  <label htmlFor="" className=" flex flex-col gap-2">
                    <p className=" min-[450px]:text-sm text-xs font-medium text-gray-700">
                      Product Length
                    </p>
                    <input
                      type="number"
                      name="productLength"
                      value={productDetails.productLength}
                      onChange={handleProductDetailsInputChange}
                      id=""
                      placeholder="Cm"
                      className=" placeholder:text-xs outline-none border-[1px] border-gray-300 bg-white rounded-md py-1 px-2"
                    />
                  </label>
                </main>
              </section>

              <section className=" md:justify-end md:gap-10 flex justify-between bg-white px-2 py-4 rounded-md">
                <button className=" self-end border-[1px] border-yellow-600 text-sm px-5 py-2 text-yellow-600 rounded-md">
                  Cancel
                </button>
                <button
                  className=" self-end border-[1px]  text-sm px-5 py-2 text-white bg-green-800 rounded-md"
                  onClick={() => addProductToDatabase()}
                >
                  Create Product
                </button>
              </section>
            </main>
          </div>
        )
      )}
    </React.Fragment>
  );
}

export default AddSellerProduct;
