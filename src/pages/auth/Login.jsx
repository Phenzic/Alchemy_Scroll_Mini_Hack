import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/input";
import AuthButton from "../../components/Buttons/auth_button";
import AuthHeading from "../../components/auth_heading";
import { getName } from "../../utils/helper";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/index";
import toast from "react-hot-toast";

const defaultValue = {
  email_address: "",
  password: "",
};

export const Login = () => {
  const [state, setstate] = useState("unloaded");
  const [formField, setFormField] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormField(defaultValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email_address, password } = formField;

    try {
      setIsLoading(true);
      await signInAuthUserWithEmailAndPassword(email_address, password);
      setIsLoading(false);
      resetFormFields();

      navigate("/");
    } catch (e) {
      setIsLoading(false);
      if (e.code == "auth/network-request-failed") {
        toast.error("No Internet Connection");
      } else if (e.code == "auth/wrong-password") {
        toast.error("Please Enter correct password");
      } else if (e.code == "auth/user-not-found") {
        toast.error("User not found");
      } else if (e.code == "auth/too-many-requests") {
        toast.error("Too many attempts please try later");
      } else if (e.code == "auth/unknown") {
        toast.error("Email and Password Fields are required");
      } else {
        toast.error("An error occured during sign in");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthHeading />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.keys(formField).map((key) => {
              return (
                <Input
                  key={key}
                  name={getName(key)}
                  type={getName(key)}
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

            <AuthButton isLoading={isLoading} />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not registered?{" "}
            <Link
              to={"/auth/register"}
              className="font-semibold leading-6 text-p hover:opacity-90"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
