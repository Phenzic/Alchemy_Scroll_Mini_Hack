import { useEffect, useState } from "react";
import { AccountButtonOutline } from "../Buttons/AccountButtons";
import Dropdown from "../Dropdown/dropdown";
import { Input } from "../input";
import { AccountHeader } from "./AccountHeader";
import { getName } from "../../utils/helper";
import { Select, SelectItem } from "@nextui-org/react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router";

const defaultValue2 = {
  first_name: "",
  last_name: "",
  phone_number: "",
  street: "",
};

const cities = [
  "Kingston",
  "Montego Bay",
  "Spanish Town",
  "Portmore",
  "Ocho Rios",
  "Mandeville",
  "May Pen",
  "Half Way Tree",
  "Savanna-la-Mar",
  "Port Antonio",
  "Linstead",
  "St. Ann's Bay",
  "Spanish Town",
  "Morant Bay",
];

export const EditDeliveryAddress = () => {
  const { id } = useParams();
  const { fetchAddresses } = useUser();
  const [formField, setFormField] = useState(defaultValue2);
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const docRef = doc(db, "addresses", id);
    setLoading(true);
    const data = await getDoc(docRef);

    setLoading(false);
    if (data.exists()) {
      const temp = data.data();
      setFormField({
        first_name: temp.first_name,
        last_name: temp.last_name,
        phone_number: temp.phone_number,
        street: temp.street,
      });
      setCity(cities.indexOf(temp.city));
    }
  };

  const clearFields = () => {
    setFormField(defaultValue2);
    setCity("");
  };

  const editAddress = async () => {
    if (
      formField.first_name.trim() == "" ||
      formField.last_name.trim() == "" ||
      formField.phone_number.trim() == "" ||
      formField.street.trim() == 0
    ) {
      toast.error("Please fill in all fields");
    } else {
      try {
        setSaving(true);
        await updateDoc(doc(db, "addresses", id), {
          ...formField,
          city: cities[city],
        }).then(() => {
          setSaving(false);
          toast.success("Address saved successfully");
          fetchAddresses();
          clearFields();
          navigate(-1);
        });
      } catch (error) {
        setSaving(false);
        console.log(error);
        toast.error("An error occured");
      }
    }
  };

  return (
    <div className="md-p-[3rem] p-4 text-[#313638] w-full gap-5 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
        <AccountHeader
          hasBack
          heading="Edit delivery address"
          text=""
          className="border-b border-b-[#313638] pb-5 w-full"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {Object.keys(formField).map((key) => {
          return (
            <Input
              disabled={loading}
              key={key}
              name={getName(key)}
              type={getName(key)}
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

        <div className="">
          <Select
            disabled={loading}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            selectedKeys={[city]}
            label="Select a City"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Kingston"
            className="max-w-xs bg-white rounded-md"
          >
            {cities.map((city, index) => (
              <SelectItem key={index} value={city}>
                {city}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-end py-5 mt-5 border-t border-[#31363895] ">
        <AccountButtonOutline
          isLoading={saving}
          disabled={loading}
          text="Save Address"
          onClick={() => {
            editAddress();
          }}
          className="px-5"
        />
      </div>
    </div>
  );
};