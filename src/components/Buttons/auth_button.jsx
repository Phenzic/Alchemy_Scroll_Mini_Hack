import React from "react";

const AuthButton = () => {
  return (
    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-p px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
      >
        Sign in
      </button>
    </div>
  );
};

export default AuthButton;
