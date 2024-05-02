import { useState } from "react";
import { AccountButtonOutline } from "../Buttons/AccountButtons";
import Dropdown from "../Dropdown/dropdown";
import { Input } from "../input";
import { AccountHeader } from "./AccountHeader";
import { getName } from "../../utils/helper";
import { Select, SelectItem } from "@nextui-org/react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const defaultValue2 = {
  first_name: "",
  last_name: "",
  phone_number: "",
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

export const AddDeliveryAddress = () => {
  const { userDetails, fetchAddresses } = useUser();
  const [formField, setFormField] = useState(defaultValue2);
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [street, setStreet] = useState("");
  const navigate = useNavigate();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "jm",
      },
    },
  });

  const handleSelect1 = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    console.log(lat, lng, address);
  };

  const clearFields = () => {
    setFormField(defaultValue2);
    setCity("");
  };

  const saveAddress = async () => {
    if (
      formField.first_name.trim() == "" ||
      formField.last_name.trim() == "" ||
      formField.phone_number.trim() == "" ||
      formField.street.trim() == "" ||
      city == ""
    ) {
      toast.error("Please fill in all fields");
    } else {
      try {
        setSaving(true);
        await addDoc(collection(db, "addresses"), {
          ...formField,
          city: cities[city],
          userId: userDetails.uid,
          default: false,
        }).then((val) => {
          updateDoc(doc(db, "addresses", val.id), {
            id: val.id,
          }).then(() => {
            setSaving(false);
            toast.success("Address saved successfully");
            fetchAddresses();
            clearFields();
            navigate(-1);
          });
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
          heading="Add delivery address"
          text=""
          className="border-b border-b-[#313638] pb-5 w-full"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {Object.keys(formField).map((key) => {
          return (
            <Input
              key={key}
              name={
                getName(key) == "Street" ? "Street Description" : getName(key)
              }
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

        <div className="relative">
          <label className="block text-sm leading-6 text-start text-gray-600">
            Street Description
          </label>
          <div className="mt-2">
            <input
              disabled={saving || !ready}
              id={"street"}
              name={"street"}
              type={"text"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required={true}
              placeholder={"Street"}
              className="block w-full text-base rounded-md border-0 py-2 px-4
   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
     focus:ring-[#305C45] sm:text-sm sm:leading-6 outline-none disabled:opacity-50"
            />
          </div>
          {status}
          <div>
            {status === "OK" &&
              data.map(({ place_id, description }) => {
                return (
                  <div key={place_id}>
                    <p onClick={() => handleSelect1(description)}>
                      {description}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="">
          <Select
            onChange={(e) => setCity(e.target.value)}
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
          text="Save Address"
          onClick={() => {
            saveAddress();
          }}
          className="px-5"
        />
      </div>
    </div>
  );
};
