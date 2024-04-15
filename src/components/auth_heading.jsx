import React from "react";
import logo from "../assets/logo.png";

const AuthHeading = ({ text = "Sign in to your account" }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {text}
      </h2>
    </div>
  );
};

export default AuthHeading;
