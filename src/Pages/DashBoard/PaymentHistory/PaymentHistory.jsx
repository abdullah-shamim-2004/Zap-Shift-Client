import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../Hooks/useSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-5xl font-bold">Payment History {payments.length}</h2>
    </div>
  );
};

export default PaymentHistory;
