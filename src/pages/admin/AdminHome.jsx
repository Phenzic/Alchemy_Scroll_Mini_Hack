import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminHome = () => {
  return (
    <div>
      <div className="flex bg-[#fbfbfb] relative">
        <AdminSidebar />

        <div className="w-full ml-[250px] max-md:ml-0">
          <AdminNavbar />
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
