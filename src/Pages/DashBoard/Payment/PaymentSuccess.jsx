import React from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const { SearchParams } = useSearchParams();
  return (
    <div>
      <h2>Payment success</h2>
    </div>
  );
};

export default PaymentSuccess;
