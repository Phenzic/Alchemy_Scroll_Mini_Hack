import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const UserRoot = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default UserRoot;
