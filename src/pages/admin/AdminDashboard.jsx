import BarChat from "../../components/charts/BarChat";
import { PieChat } from "../../components/charts/PieChat";
import Orders from "../../components/admin/Orders";
import { AccountHeader } from "../../components/account/AccountHeader";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-10 p-5 h-[89vh] max-h-[89vh] overflow-auto">
      <div className="flex gap-10 justify-between ">
        <AdminInfo />
        <AdminInfo />
        <AdminInfo />
      </div>

      <div className="flex gap-10 justify-between bg-white p-3 rounded-2xl">
        <BarChat />

        <PieChat />
      </div>

      <div className="p-5 bg-white rounded-2xl">
        <AccountHeader
          heading="Recent Orders"
          text=""
          className="mb-5"
        />
        <Orders />
      </div>


    </div>
  );

  function AdminInfo() {
    return (
      <div className="p-6 flex-col  bg-white w-full rounded-2xl">
        <p className="text-neutral-400 text-lg font-normal mb-5">Total sales</p>

        <h1 className="text-neutral-700 text-[28px] font-medium mb-3">
          $ 185,700
        </h1>

        <p className="text-neutral-700 text-sm font-normal leading-tight inline-flex gap-2 items-center">
          <span className="px-3 py-1 text-[#0d0d0d] bg-[#305c4523] rounded-3xl font-medium">
            4.8%
          </span>
          from yesterday
        </p>
      </div>
    );
  }
};

export default AdminDashboard;
