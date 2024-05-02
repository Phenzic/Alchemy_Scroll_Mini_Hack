import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#011a1d",
      fontWeight:"500",
      fontSize: "17px",
      fontFamily:"Plus Jakarta Sans, sans-serif",
      fontSmoothing: 'antialiased',
      "::placeholder": {
        color: "#011a1d50",
      },
    },
    invalid: {
      color: "#ff0000",
      iconColor: "#ffffff",
    },
  },
};

export default function CardInput() {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
}
