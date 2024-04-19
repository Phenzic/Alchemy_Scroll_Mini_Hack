import React from "react";

const AuthButton = ({ isLoading, title = "Sign in" }) => {
  return (
    <div>
      <button
        disabled={isLoading}
        type="submit"
        className="flex w-full justify-center rounded-md bg-p px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 items-center disabled:opacity-50"
      >
        {isLoading ? (
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : (
          title
        )}
      </button>
    </div>
  );
};

export default AuthButton;
