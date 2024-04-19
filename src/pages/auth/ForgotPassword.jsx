import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/input";
import AuthButton from "../../components/Buttons/auth_button";
import AuthHeading from "../../components/auth/auth_heading";
import { getName } from "../../utils/helper";
import { auth } from "../../utils/firebase";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const defaultValue = {
  email_address: "",
};

export const ForgotPassword = () => {
  const [state, setstate] = useState("unloaded");
  const [formField, setFormField] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormField(defaultValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { email_address } = formField;
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email_address);
      resetFormFields();
      setIsLoading(false);
      toast.success("Password reset email has been sent to your mail.");
      navigate("/auth/login");
    } catch (error) {
      toast.error("An error occured while sending password reset email");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthHeading text="Forgot Password" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            {Object.keys(formField).map((key) => {
              return (
                <Input
                  key={key}
                  name={getName(key)}
                  type={"text"}
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

            <AuthButton isLoading={isLoading} title="Reset Password" />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not registered?{" "}
            <Link
              to="/auth/register"
              className="font-semibold leading-6 text-p hover:text-opacity-90"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
