import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/input";
import AuthButton from "../../components/Buttons/auth_button";
import AuthHeading from "../../components/auth_heading";
import { getName } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase";
import toast from "react-hot-toast";

const defaultValue = {
  username: "",
  email_address: "",
  password: "",
  confirm_password: "",
};

export const Register = () => {
  const [state, setstate] = useState("unloaded");
  const [formField, setFormField] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormField(defaultValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setstate("loading");
    const { email_address, password, confirm_password, username } = formField;

    if (password !== confirm_password) {
      toast.error("passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Please input a longer password (8+)");
      return;
    }

    try {
      setIsLoading(true);
      const { user } = await createAuthUserWithEmailAndPassword(
        email_address,
        password
      );

      await createUserDocumentFromAuth(user, username);
      setIsLoading(false);
      toast.success("Welcome to JAMAZAN");
      navigate("/");
      resetFormFields();
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Cannot create user, email already in use");
      } else {
        toast.error("user creation encountered an error");
        console.log("user creation encountered an error", error);
      }
    }

    setstate("loaded");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthHeading text={"Welcome to JAMAZAM"} />

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

            <AuthButton title="Sign Up" isLoading={isLoading} />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              to={"/auth/login"}
              className="font-semibold leading-6 text-p hover:opacity-90"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
