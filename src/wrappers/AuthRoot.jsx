import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const AuthRoot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == "/auth") {
      navigate("/auth/login");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthRoot;
