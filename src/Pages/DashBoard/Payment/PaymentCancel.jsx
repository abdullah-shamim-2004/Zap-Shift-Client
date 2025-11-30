import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h2>Your payment cancelled</h2>
      <Link className="btn" to="/dashboard/my-parcels">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancel;
