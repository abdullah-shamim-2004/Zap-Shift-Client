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
      return res.data.data;
    },
  });
  // console.log(payments);

  return (
    <div className="p-5">
      <h2 className="text-5xl font-bold">Payment History {payments.length}</h2>
      <div>
        {payments.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[60vh]">
            <h2>No Payment History</h2>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Tranjection Id</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{payment.parcelName}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.transactionId}</td>
                  </tr>
                ))}
                {/* row 1 */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
