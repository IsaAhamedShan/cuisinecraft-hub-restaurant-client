import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete, MdOutlinePendingActions } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionIntro from "../../../common/SectionIntro";
import { AuthContext } from "../../../provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["mybookings", user?.email],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(
          `/myBookings?email=${user?.email}`
        );
        // console.log("booking data: ",response.data)
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  function convertToAMPM(time24) {
    const [hour, minute] = time24.split(":");
    const timeObj = new Date(0, 0, 0, hour, minute);
    return format(timeObj, "h:mm a");
  }
  const handleDeleteReservation = (_id)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Cancel Reservation?",
          cancelButtonText: "No!",
          reverseButtons: true,
        })
        .then(result => {
          if (result.isConfirmed) {
            axiosSecure
              .delete(`/deleteReservation?_id=${_id}`,)
              .then(res => {
                console.log(res)

                if (res.data.deletedCount > 0) {
                  toast.success("Reservation Deleted");
                  refetch();
                } else {
                  toast.error("Something is wrong.Try Again");
                }
              });
          }
        });
    };

  return (
    <div>
      <SectionIntro
        heading="Excellent Choice"
        text="YOUR  RESERVATION"
      ></SectionIntro>
      <div>
        <div className="flex justify-between items-center w-full p-6 max-w-7xl mx-auto">
          <p className="text-lg md:text-2xl lg:text-3xl">
            Total Reservation: {data && data.length}
          </p>
        </div>
        {/* table */}
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="table">
            {/* head */}
            <thead className=" bg-red-300">
              <tr className="">
                <th className="">#</th>
                <th className="py-6  md:text-xl ">Confirmation Email</th>
                <th className="py-6  md:text-xl ">Contact</th>
                <th className="py-6 pl-5 md:text-xl ">Date</th>
                <th className="py-6  md:text-xl ">Time</th>
                <th className="py-6  md:text-xl ">Status</th>
                <th className="py-6  md:text-xl ">Delete </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-6">
                          <div>
                            <p className=" text-normal md:text-lg">
                              {index + 1}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.reservationData.email}
                          <br />
                        </div>
                      </td>

                      <td className="px-4 md:px-4">
                        {item.reservationData.phone}
                      </td>
                      <td className="px-4 md:px-4">
                        {item.reservationData.date}
                      </td>
                      <td className="px-4 md:px-4">
                        {convertToAMPM(item.reservationData.time)}
                      </td>
                      <td className="px-4 md:px-4">
                        {item.reservationData.status === "pending" ? (
                          <MdOutlinePendingActions className="text-orange-400 ml-4 text-3xl " />
                        ) : (
                          <GiConfirmed className="text-green-500 text-3xl ml-4" />
                        )}
                      </td>
                      <td className="px-4 md:px-4">
                        {item.reservationData.status === "pending" ? (
                            <button className="hover:scale-105">
                                <MdDelete  className="text-red-500 text-3xl ml-4" onClick={()=>handleDeleteReservation(item._id)} />
                            </button>
                        ) : (
                          <MdDelete className="text-gray-400 text-3xl ml-4 disabled:" />
                        )}
                      </td>
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

export default MyBookings;
