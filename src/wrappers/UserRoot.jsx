import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTopOnRouteChange from "../components/ScrollStartAtTop";

const UserRoot = () => {
  return (
    <>
      <NavBar />
      <ScrollToTopOnRouteChange />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserRoot;
