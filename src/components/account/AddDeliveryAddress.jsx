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

export const AddDeliveryAddress = () => {
  const [formField, setFormField] = useState(defaultValue2);
  return (
    <div className="md-p-[3rem] p-4 text-[#313638] w-full gap-5 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
        <AccountHeader
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

        <div className="">
          <label className="block text-sm leading-8 text-start text-gray-600">
            Select City
          </label>
          <Dropdown
            header="Select City"
            children={cities.map((city, index) => ({
              text: city,
              onClick: () => {},
              className: "",
            }))}
          />
        </div>
      </div>

      <div className="flex justify-end py-5 mt-5 border-t border-[#31363895] ">
        <AccountButtonOutline
          text="Save Address"
          onClick={() => {}}
          className="px-5"
        />
      </div>
    </div>
  );
};
