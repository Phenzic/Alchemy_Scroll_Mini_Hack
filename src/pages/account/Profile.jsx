import { AccountButtonOutline } from "../../components/Buttons/AccountButtons";
import Dropdown from "../../components/Dropdown/dropdown";
import { AccountHeader } from "../../components/account/AccountHeader";

export const Profile = () => {
  return (
    <div className="md-p-[3rem] p-4 text-[#313638] w-full gap-5 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
        <AccountHeader
          heading="Hello, Marvellous Richard"
          text="07087562892 l kin@g.com"
        />

        <AccountButtonOutline text="Edit Profile" onClick={() => {}} />
      </div>

      <div
        className="w-full md:w-[492px] h-auto 
        md:h-56 relative bg-stone-50 bg-opacity-95
        rounded-lg flex justify-start pl-5 md:pl-10 
        items-center"
      >
        <div
          className="w-full flex-col  items-start 
          gap-[12px] md:gap-[37px] flex justify-between"
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
        <h3 className="md:text-lg text-sm font-semibold border-b border-[#313638] py-5 opacity-60">
          Delivery address
        </h3>

        <div className="flex flex-col gap-[3rem] my-[3rem] ">
          <div className="flex justify-between items-center">
            <p className="opacity-60 ">
              Address : 9, shobande street, beside nipco filing station,
              Surulere, L.agos <br /> Contact : 0807568302
            </p>

            <div className="flex gap-3 flex-col md:flex-row  items-center">
              <button
                className="  px-2.5 py-1 h-fit  bg-zinc-100 
            rounded text-xs
            text-[#305C45] 
            font-normal "
              >
                Default
              </button>

              <Dropdown
                header="Edit"
                children={[
                  {
                    text: "Edit",
                    onClick: () => {},
                    className: "",
                  },
                  {
                    text: "Set as default address",
                    onClick: () => {},
                    className: "",
                  },
                  {
                    text: "Remove",
                    onClick: () => {},
                    className: "text-red-500",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end py-3 border-t border-[#31363895] ">
          <AccountButtonOutline
            text="Add new address"
            onClick={() => {}}
            className="px-5"
          />
        </div>
      </div>
    </div>
  );
};
