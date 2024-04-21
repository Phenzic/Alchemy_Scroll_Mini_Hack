import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useUser } from "../../context/UserContext";
import { AccountButtonOutline } from "../Buttons/AccountButtons";
import Dropdown from "../Dropdown/dropdown";
import { AccountHeader } from "../account/AccountHeader";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";

export const ProfileComponent = () => {
  const navigate = useNavigate();
  const {
    userDetails,
    deliveryAddresses,
    loadingAddress,
    fetchAddresses,
    setLoadingAddress,
  } = useUser();

  const handleSetDefault = async (id) => {
    setLoadingAddress(true);
    Promise.all(
      deliveryAddresses.map(async (address) => {
        if (address.id !== id) {
          await updateDoc(doc(db, "addresses", address.id), {
            default: false,
          });
        } else {
          await updateDoc(doc(db, "addresses", id), {
            default: true,
          });
        }
      })
    )
      .then(() => {
        setLoadingAddress(false);
        toast.success("Address updated successfully");
        fetchAddresses();
      })
      .catch((e) => {
        console.log(e);
        setLoadingAddress(false);
        toast.error("An error occured while updating address");
      });
  };

  const handleRemove = async (id) => {
    setLoadingAddress(true);
    await deleteDoc(doc(db, "addresses", id))
      .then(() => {
        setLoadingAddress(false);
        toast.success("Address deleted successfully");
        fetchAddresses();
      })
      .catch(() => {
        setLoadingAddress(false);
        toast.error("An error occured while deleting address");
      });
  };

  return (
    <div className="md-p-[3rem] p-4 text-[#313638] w-full gap-5 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
        <AccountHeader
          heading={`Hello, ${userDetails.username}`}
          text={`07087562892 | ${userDetails.email}`}
        />

        <AccountButtonOutline
          text="Edit Profile"
          onClick={() => {
            navigate("/account/profile/edit-profile");
          }}
        />
      </div>

      <div
        className="w-[50%] max-md:w-full h-[200px] relative bg-[#313638]/[5%] bg-opacity-95
        rounded-lg flex justify-start  
        items-center"
      >
        <div
          className="w-full flex flex-col  items-start 
           p-3 px-10 justify-between gap-14"
        >
          <h1 className="text-neutral-700 text-[16px] md:text-[28px] font-normal ">
            Orders this month
          </h1>

          <p className="text-neutral-700 text-[16px] md:text-[28px] font-medium ">
            0
          </p>
        </div>
      </div>

      <div className="">
        <h3 className="md:text-lg text-sm font-semibold border-b py-5 opacity-60">
          Delivery address
        </h3>

        <div className="flex flex-col gap-[3rem] my-[3rem] ">
          {loadingAddress ? (
            <div className="flex items-center justify-center flex-col gap-3">
              <div
                className="inline-block h-[30px] w-[30px] animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#305C45]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <span className="text-sm">Loading addresses...</span>
            </div>
          ) : deliveryAddresses.length < 1 ? (
            <p>No delivery addresses added.</p>
          ) : (
            deliveryAddresses
              .sort((a, b) => (a.default ? -1 : 1))
              .map((val, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="opacity-60 ">
                    Address : {val.street}, {val.city} <br /> Contact :{" "}
                    {val.phone_number}
                  </p>

                  <div className="flex gap-3 flex-col md:flex-row  items-center ">
                    {val.default && (
                      <button
                        className="  px-2.5 py-1 h-fit  bg-zinc-100 
            rounded text-xs
            text-[#305C45] 
            font-normal "
                      >
                        Default
                      </button>
                    )}

                    <Dropdown
                      header="Edit"
                      children={[
                        {
                          text: "Edit",
                          onClick: () => {
                            navigate(`profile/edit-address/${val.id}`);
                          },
                          className: "",
                        },
                        {
                          text: "Set as default address",
                          onClick: () => {
                            handleSetDefault(val.id);
                          },
                          className: val.default ? "hidden" : "",
                        },
                        {
                          text: "Remove",
                          onClick: () => {
                            handleRemove(val.id);
                          },
                          className: "text-red-500",
                        },
                      ]}
                    />
                  </div>
                </div>
              ))
          )}
        </div>

        <div className="flex justify-end py-3 border-t ">
          <AccountButtonOutline
            text="Add new address"
            onClick={() => {
              navigate("/account/profile/add-new-address");
            }}
            className="px-5"
          />
        </div>
      </div>
    </div>
  );
};
