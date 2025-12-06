import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecure from "../../../Hooks/useSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagment = () => {
  const axiosSecure = useSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  const UserRole = async (user, role) => {
    const userInfo = { role };

    const result = await Swal.fire({
      title: `Are you sure you want to set this user role to: ${role}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, userInfo);

      if (res.data?.modifiedCount > 0) {
        await refetch();

        Swal.fire({
          title: "Confirmed!",
          text: `${user.displayName} is now an ${role}.`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "No Changes!",
          text: "It seems this user already has this role.",
          icon: "info",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  const handleMakeAdmin = (user) => {
    UserRole(user, "admin");
  };
  const handleRemoveAdmin = (user) => {
    UserRole(user, "user");
  };

  return (
    <div>
      <h2 className="text-4xl">Manage Users {users?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => {
                        handleRemoveAdmin(user);
                      }}
                      className="btn btn-error"
                    >
                      <FiShieldOff size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user);
                      }}
                      className="btn btn-success"
                    >
                      <FaUserShield size={20} />
                    </button>
                  )}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagment;
