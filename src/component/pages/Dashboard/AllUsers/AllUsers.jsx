import { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import SectionIntro from "../../../common/SectionIntro";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const deleteSuccess = () => toast.success("Item Deleted successfully");

  const handleDeleteUser = _id => {
    Swal.fire({
      title: "Delete from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#ffffff",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deleteUser/${_id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              deleteSuccess();
            }
          })
          .catch(err => {
            console.log("🚀 ~ handleDeleteItem ~ err:", err);
          });
      }
    });
  };
  const { data: usersList = [], refetch } = useQuery({
    queryKey: ["usersList", user?.email],
    queryFn: async () => {
      const userData = await axiosSecure.get("/users");
      console.log(userData.data);
      return userData.data;
    },
  });

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <SectionIntro
        heading="Manage All Users"
        text="Users List"
        textColor="text-black"
      ></SectionIntro>
      {/* {cart && <p>usercart length : {cart.length}</p>} */}
      <div>
        <div className="flex justify-between items-center w-full p-6 max-w-7xl mx-auto">
          <p className="text-lg md:text-2xl lg:text-3xl">
            Total Users: {usersList && usersList.length}
          </p>
        </div>
        {/* table */}
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="table">
            {/* head */}
            <thead className=" bg-red-300">
              <tr className="">
                <th className="">#</th>
                <th className="py-6  md:text-xl ">Name</th>
                <th className="py-6  md:text-xl ">Email</th>
                <th className="py-6  md:text-xl ">Role</th>
                <th className="py-6  md:text-xl ">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList &&
                usersList.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-lg">{index + 1}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div>
                          {item.username}
                          <br />
                        </div>
                      </td>
                      <td>{item.email} $</td>
                      <td>
                        <RiDeleteBin6Line className=" text-red-600 hover:scale-105 duration-150  rounded-md cursor-pointer md:text-xl xl:text-2xl" />
                      </td>
                      <th>
                        <button
                          className="btn"
                          onClick={() => {
                            handleDeleteUser(item._id);
                          }}
                        >
                          <RiDeleteBin6Line className=" text-red-600 hover:scale-105 duration-150  rounded-md cursor-pointer md:text-xl xl:text-2xl" />
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
