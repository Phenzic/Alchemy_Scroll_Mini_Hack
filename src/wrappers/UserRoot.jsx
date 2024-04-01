import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const UserRoot = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default UserRoot;
