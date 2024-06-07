import React, { useState } from "react";
import { Input } from "../input";
import AuthButton from "../Buttons/auth_button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase";
import { getName } from "../../utils/helper";
import { useUser } from "../../context/UserContext";

const defaultValue = {
  username: "",
  email_address: "",
  password: "",
  confirm_password: "",
};
const UserRegister = () => {
  const { setUserDetails } = useUser();
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

      const data = await createUserDocumentFromAuth(user, username);
      setUserDetails(data);
      localStorage.setItem("userDetails", JSON.stringify(data));
      setIsLoading(false);
      toast.success("Welcome to JAMAZAN");
      navigate("/");
      resetFormFields();
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Cannot create account, email already in use");
      } else {
        toast.error("Account creation encountered an error");
      }
    }

    setstate("loaded");
  };
  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
  );
};

export default UserRegister;
