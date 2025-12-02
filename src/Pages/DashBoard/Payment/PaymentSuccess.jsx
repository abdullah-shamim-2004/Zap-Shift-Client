import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useSecure from "../../../Hooks/useSecure";

const PaymentSuccess = () => {
  const [SearchParams] = useSearchParams();
  const sessionId = SearchParams.get("session_id")?.trim();
  const axiosSecure = useSecure();
  console.log(sessionId);
  useEffect(() => {
    if (sessionId) {
      if (!sessionId) return;
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2>Payment success</h2>
    </div>
  );
};

export default PaymentSuccess;
