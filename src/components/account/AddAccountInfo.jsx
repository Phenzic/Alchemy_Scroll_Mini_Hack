import { useState } from "react";
import { AccountHeader } from "./AccountHeader";
import { Input } from "../input";
import {
  AccountButtonFilled,
  AccountButtonOutline,
} from "../Buttons/AccountButtons";
import { getName } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";

const defaultValue = {
  first_name: "",
  last_name: "",
  email_address: "",
  phone_number: "",
};

export const AddAccountInfo = () => {
  const { userDetails, setUserDetails } = useUser();
  const [formField, setFormField] = useState(defaultValue);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      setFormField({
        first_name: userDetails.firstName || "",
        last_name: userDetails.lastName || "",
        email_address: userDetails.email,
        phone_number: userDetails.phoneNumber || "",
      });
    }
  }, [userDetails]);

  const updateProfile = async () => {
    const newData = {
      firstName: formField.first_name,
      lastName: formField.last_name,
      email: formField.email_address,
      phoneNumber: formField.phone_number,
    };
    if (
      formField.first_name.trim() == "" ||
      formField.last_name.trim() == "" ||
      formField.phone_number.trim() == "" ||
      formField.email_address.trim() == ""
    ) {
      toast.error("Please fill in all fields");
    } else {
      try {
        setSaving(true);
        updateDoc(doc(db, "users", userDetails.uid), newData).then(() => {
          setUserDetails({ ...userDetails, ...newData });
          setSaving(false);
          toast.success("Account information saved successfully");
          navigate(-1);
        });
      } catch (error) {
        toast.error("An error occured while updating account information");
      }
    }
  };

  return (
    <div className="md-p-[3rem] p-4 text-[#313638] w-full gap-5 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
        <AccountHeader
          hasBack
          heading="Account information"
          text=""
          className="border-b border-b-[#313638] pb-5 w-full"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {Object.keys(formField).map((key) => {
          return (
            <Input
              key={key}
              name={getName(key)}
              type={"text"}
              value={formField[key]}
              placeholder={getName(key)}
              onChange={(e) => {
                setFormField((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }));
              }}
            />
          );
        })}
      </div>

      <div className="flex justify-end py-5 mt-5 border-t border-[#31363895] ">
        <AccountButtonOutline
          text="Save"
          isLoading={saving}
          onClick={() => updateProfile()}
          className="px-5"
        />
      </div>
    </div>
  );
};
