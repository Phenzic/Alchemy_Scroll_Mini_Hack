import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/Footer";
import ScrollToTopOnRouteChange from "../components/ScrollStartAtTop";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51P81xGRsmFh9wreMAPKsFUb4rxicJJyWp347tq7y0qgksvvXJC2EVepIwk2SkzENu8InXzOUSHyAYFV1j0w3BG0q00Gk8PmyRr"
);
const UserRoot = () => {
  return (
    <>
      <NavBar />
      <ScrollToTopOnRouteChange />
      <div className="container mx-auto">
        <Elements stripe={stripePromise}>
          <Outlet />
        </Elements>
      </div>
      <Footer />
    </>
  );
};

export default UserRoot;
