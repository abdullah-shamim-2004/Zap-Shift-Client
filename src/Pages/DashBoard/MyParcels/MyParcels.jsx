import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useSecure from "../../../Hooks/useSecure";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineOpenInFull } from "react-icons/md";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();
  // use tanstack to fetch data
  const { data: parcels, refetch } = useQuery({
    queryKey: ["Myparcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  //   console.log(parcels);
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            // Refetch the data
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      All my parcels {parcels?.length}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Delevery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button className="btn btn-primary btn-sm text-black">
                        Pay
                      </button>
                    </Link>
                  )}
                </td>
                <td>Pandeing</td>
                <td className="gap-2 flex">
                  {" "}
                  <button
                    //   onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-outline "
                  >
                    <MdOutlineOpenInFull size={18} />
                  </button>
                  <Link
                    //   to={`/edit-reviews/${review._id}`}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
