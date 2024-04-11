import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminHome = () => {
  return (
    <div>
      <div className="flex gap-5 md:h-screen bg-gray-100 ">
        <AdminSidebar />

        <div className="w-full ">
          <AdminNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
