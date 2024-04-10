const defaultValue = {
  first_name: "",
  last_name: "",
  email_address: "",
  phone_number: "",
};

export const AddAccountInfo = () => {
  const [formField, setFormField] = useState(defaultValue);
  return (
    <div className="md-p-[3rem] p-4 text-[#313638] w-full gap-5 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
        <AccountHeader
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

      <div className="flex justify-between py-5 mt-5 border-t border-[#31363895] ">
        <AccountButtonFilled
          text="Cancel"
          onClick={() => {}}
          className="px-5"
        />
        <AccountButtonOutline text="Save" onClick={() => {}} className="px-5" />
      </div>
    </div>
  );
};
