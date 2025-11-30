import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useSecure from "../../../Hooks/useSecure";
import Loader from "../../Loader/Loader";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useSecure();
  // Get the parcel with tanstack and axios
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  // console.log(parcel);
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h2>
        Please pay ${parcel.cost} for {parcel?.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary">
        Pay
      </button>
    </div>
  );
};

export default Payment;
