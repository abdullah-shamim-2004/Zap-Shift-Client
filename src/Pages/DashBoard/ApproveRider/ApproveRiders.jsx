import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecure from "../../../Hooks/useSecure";

import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  //Update rider status
  const updateRiderStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.email,
    };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is ${status}. `,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  // handle approve status
  const handleApprove = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">Approve Riders {riders?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders?.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.status}</td>
                <td>{rider.district}</td>
                <td className="gap-2 flex">
                  {" "}
                  {/* Accept btn */}
                  <button
                    onClick={() => {
                      handleApprove(rider);
                    }}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    <FaUserCheck />
                  </button>
                  {/* Delete btn */}
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <IoPersonRemoveSharp />
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

export default ApproveRiders;
