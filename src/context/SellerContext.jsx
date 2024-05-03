import React, { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from "react-router";

export const SellerContext = createContext();

export const useSeller = () => {
  return useContext(SellerContext);
};

const SellerProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [retrievedProductData, setRetrievedProductData] = useState();
  // const navigate = useNavigate();
  const [param, setParam] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const { userDetails } = useUser();

  const [
    imagesToDeleteFromStorageAfterEditing,
    setImagesToDeleteFromStorageAfterEditing,
  ] = useState([]);
  const [
    variationsToDeleteFromDbAfterEditing,
    setVariationsToDeleteFromDbAfterEditing,
  ] = useState([]);
  const [
    tagsToDeleteFromDbAfterEditing,
    setTagsToDeleteFromDbAfterEditing,
  ] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [variations, setVariations] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    imageStorageFileName: "",
    description: "",
    otherInformation: "",
    price: 0,
    discountRate: 0,
    discountedPrice: 0,
    quantity: 0,
    category: "",
    productSku: "",
    productWeight: "",
    productHeight: "",
    productWidth: "",
    productLength: "",
    imageUrls: [],
    variations: [],
    tags: [],
  });

  const resetFields = {
    name: "",
    imageStorageFileName: "",
    description: "",
    otherInformation: "",
    price: 0,
    discountRate: 0,
    discountedPrice: 0,
    quantity: 0,
    category: "",
    productSku: "",
    productWeight: "",
    productHeight: "",
    productWidth: "",
    productLength: "",
    imageUrls: [],
    variations: [],
    tags: [],
  };
  const [dragOver, setDragOver] = React.useState(false);

  const getProductDetailsFromDatabase = async (urlParam) => {
    setIsLoading(true);
    if (urlParam === null) {
      setIsLoading(true);
      setProductDetails(resetFields);
      console.log("no param");
      setIsLoading(false);
      return;
    }
    console.log(urlParam);
    setParam(urlParam);

    try {
      setIsLoading(true);
      const productDocumentRef = doc(db, "products", urlParam);
      const productDocumentSnapshot = await getDoc(productDocumentRef);
      const productData = productDocumentSnapshot.data();
      console.log(productData);
      setProductDetails(productData);
      setIsLoading(false);
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const getCategoriesFromDb = async () => {
    try {
      setIsLoading(true);
      const categoriesDocumentReference = doc(
        db,
        "jamazan-options",
        "categories"
      );
      const categoriesDocumentSnapshot = await getDoc(
        categoriesDocumentReference
      );
      const categoriesData = categoriesDocumentSnapshot.data();
      setCategories(categoriesData.categories);
      console.log(categoriesData.categories);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesFromDb();
  }, []);

  //////////////////////////////// HANDLERS FOR CHANGES AND INPUT FOR ADDING PRODUCT TAGS //////////////////////////////////////////////////////////////////

  // TAG FUNCTION TO ADD TAG WHEN ENTER KEY IS PRESSED
  const enterTagEvent = (event) => {
    if (event.key === "Enter") {
      // Prevent the default action of submitting the form
      event.preventDefault();

      // Add the current input value to the array if it's not empty
      if (tagInputValue.trim() !== "") {
        setTags((prevValues) => [...prevValues, tagInputValue.trim()]);
        setTagInputValue(""); // Clear the input after adding the value to the array
      }
    }
  };

  //HANDLE INPUT CHANGES IN TAG INPUT FIELD
  const handleTagChange = (event) => {
    setTagInputValue(event.target.value);
  };

  //////////////////////////////////////////////////////////////// HANDLES FOR IMAGE DRAG AND DROP UPLOAD //////////////////////////////////////////////////////////////////

  const handleFileSelect = (event) => {
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      const fileURL = URL.createObjectURL(file);
      setSelectedFiles((prevFiles) => [...prevFiles, file]); // Update state using the callback function syntax
      console.log(fileURL);
    }
  };

  //HANDLES WHEN THE OBJECT BEING DRAGGED IS OVER THE DRAG COMPONENT
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  //HANDLES WHEN THE OBJECT BEING DRAGGED IS LEAVING THE DRAG COMPONENT
  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  //HANDLES WHEN THE OBJECT BEING DRAGGED IS DROPPED OR RELEASED on THE DRAG COMPONENT
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedFiles((prevFiles) => prevFiles.concat(fileArray));
    setDragOver(false);
  };

  //////////////////////////////////////////////////////////////// HANDLERS FOR CHOOSNG AND ADDING VARIATION //////////////////////////////////////////////////////////////////
  const updatePropertyAtIndex = (array, index, propertyName, value) => {
    return array.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [propertyName]: value,
        };
      }
      return item;
    });
  };

  const handleVariationInputChange = (e, index, propertyName) => {
    const newValue = e.target.value;
    setVariations((prevVariations) =>
      updatePropertyAtIndex(prevVariations, index, propertyName, newValue)
    );
  };

  const handleAddVariation = () => {
    setVariations((prevState) => [
      ...prevState,
      {
        type: "",
        variation: "",
      },
    ]);
  };

  //////////////////////////////////////////////////////////////// HANDLERS FOR HANDLING INPUT TAGS //////////////////////////////////////////////////////////////////

  const handleProductDetailsInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "discountRate" || name === "price") {
      // If the input being changed is the discountRate field or the price field, calculate the discounted price
      const price = name === "price" ? parseFloat(value) : productDetails.price;
      const discountRate =
        name === "discountRate"
          ? parseFloat(value)
          : productDetails.discountRate;

      const calculatedDiscountedPrice = price - price * (discountRate / 100);

      // Update the state with the new discountRate and the calculated discountedPrice
      setProductDetails((prevState) => ({
        ...prevState,
        [name]: value,
        discountedPrice: calculatedDiscountedPrice,
      }));
    } else {
      // For other fields, update the state normally
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  //////////////////////////////////////////////////////////////// ADDING PRODUCT TO DATABASE //////////////////////////////////////////////////////////////////
  const addProductToDatabase = async (uid) => {
    try {
      setIsLoading(true);
      const collectionRef = collection(db, "products");
      let downloadURLs = [];

      // Use Promise.all to await all async operations inside map
      await Promise.all(
        selectedFiles.map(async (file) => {
          const fileName = v4();
          const filePath = `Imgs/${uid}/${
            param !== null
              ? productDetails.imageStorageFileName
              : productDetails.name
          }/${fileName}`;
          const storageRef = ref(storage, filePath);
          const snapshot = await uploadBytes(storageRef, file);
          console.log("File Uploaded");

          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log("Download URL: " + downloadURL);

          downloadURLs.push({
            filename: fileName,
            url: downloadURL,
          });

          console.log("PUSHED ...............................");
        })
      );

      // Update productDetails with imageUrls
      const updatedProductDetails = {
        ...productDetails,
        sellerId: uid,
        updatedAt: serverTimestamp(),
        imageStorageFileName:
          param !== null
            ? productDetails.imageStorageFileName
            : productDetails.name,
        imageUrls: [
          ...productDetails.imageUrls,
          ...downloadURLs.map((item) => ({
            filename: item.filename,
            url: item.url,
          })),
        ],
        tags: [...productDetails.tags, ...tags.map((item) => item)],
        variations: [
          ...productDetails.variations,
          ...variations.map((item) => ({
            type: item.type,
            variation: item.variation,
          })),
        ],
      };

      if (param !== null) {
        const productRef = doc(db, "products", param);
        deleteImageFromStorage(uid);
        await updateDoc(productRef, updatedProductDetails);
        console.log("PRODUCT UPDATED");
        setProductDetails(resetFields);
        setSelectedFiles([]);
        setTags([]);
        setVariations([]);
        // navigate("/seller/products");
        setIsLoading(false);
        return;
      }

      // Add product details (including imageUrls) to Firestore
      const productRef = await addDoc(collectionRef, updatedProductDetails);
      console.log("PRODUCT UPLOADED with ID:", productRef.id);

      console.log("PRODUCT UPLOADED");
      setProductDetails(resetFields);
      setSelectedFiles([]);
      setTags([]);
      setVariations([]);
      // navigate("/seller/products");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Adddd = () => {
    console.log(productDetails);
  };
  //////////////////////////////////////////////////////////////// HANDLER FOR DELETING ITEMS FROM ANY ARRAY INPUT //////////////////////////////////////////////////////////////////
  const handleDeleteItemsFromArray = (index, setArray) => {
    setArray((prevValues) => prevValues.filter((_, i) => i !== index));
  };

  const deleteImageFromStorage = async (uid) => {
    try {
      await Promise.all(
        imagesToDeleteFromStorageAfterEditing.map(async (item) => {
          // Create a reference to the file in Firebase Storage
          const fileRef = ref(
            storage,
            `Imgs/${uid}/${productDetails.imageStorageFileName}/${item}`
          );
          // Delete the file from Firebase Storage
          await deleteObject(fileRef);

          console.log("Image deleted successfully.");
        })
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const deleteParticularObjectFromStorage = async (indexToRemove,objectKey, arrayToRemoveFrom, setAlternateArrayToStoreImagesToDelete) => {
    try {
      setAlternateArrayToStoreImagesToDelete((prevState) =>
        prevState.concat(arrayToRemoveFrom[indexToRemove].filename)
      );

      const updatedUrls = [
        ...arrayToRemoveFrom.slice(0, indexToRemove),
        ...arrayToRemoveFrom.slice(indexToRemove + 1),
      ];

      setProductDetails((prevState) => ({
        ...prevState,
        [objectKey]: updatedUrls,
      }));
      console.log("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // const deleteImageFromFirestore = async(image) => {
  //   try {
  //     const productDocumentRef = doc(db, "users", "9XSNjvRBTrI3fwHRBIpu", 'products', productId);
  //     deleteImageFromStorage({fileArray:fileArray, productName:productName})
  //     await deleteDoc(productDocumentRef);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    console.log(variations);
    console.log(tags);
    console.log(productDetails);
    console.log("Selected Files:", selectedFiles);
    console.log(
      "images to delete from storage" + imagesToDeleteFromStorageAfterEditing
    );
  }, [
    variations,
    tags,
    productDetails,
    selectedFiles,
    imagesToDeleteFromStorageAfterEditing,
  ]);

  const values = {
    categories,
    isLoading,
    productDetails,
    selectedFiles,
    dragOver,
    tagInputValue,
    variations,
    param,
    getProductDetailsFromDatabase,
    setParam,
    setVariations,
    Adddd,
    tags,
    setTags,
    tagsToDeleteFromDbAfterEditing,
    setTagsToDeleteFromDbAfterEditing,
    setImagesToDeleteFromStorageAfterEditing,
    variationsToDeleteFromDbAfterEditing,
    setVariationsToDeleteFromDbAfterEditing,
    deleteParticularObjectFromStorage,
    setProductDetails,
    setSelectedFiles,
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
  };
  return (
    <SellerContext.Provider value={values}>{children}</SellerContext.Provider>
  );
};

export default SellerProvider;
