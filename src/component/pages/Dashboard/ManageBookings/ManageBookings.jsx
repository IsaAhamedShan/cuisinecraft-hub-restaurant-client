import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlinePendingActions } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionIntro from "../../../common/SectionIntro";
const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["manageBookings"],
    queryFn: async () => {
      const response = await axiosSecure.get("/allBookings");
      //   console.log("managebooking data ;", response.data);
      return response.data;
    },
  });
  const handleReservation = itemId => {
    // console.log(itemId);
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
        confirmButtonText: "Confirm Reservation?",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          axiosSecure
            .patch("/confirmReservation", {
              itemId,
            })
            .then(res => {
              console.log(res)
              if (res.data.modifiedCount > 0) {
                toast.success("Reservation Confirmed");
                refetch();
              } else {
                toast.error("Something is wrong");
              }
            });
        }
      });
  };

  function convertToAMPM(time24) {
    const [hour, minute] = time24.split(":");
    const timeObj = new Date(0, 0, 0, hour, minute);
    return format(timeObj, "h:mm a");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots text-5xl text-red-300"></span>
      </div>
    );
  }
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <SectionIntro heading="At a Glance!" text="ALL BOOKINGS"></SectionIntro>
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
                <th className="py-6  md:text-xl ">Email</th>
                <th className="py-6  md:text-xl ">Contact</th>
                <th className="py-6 pl-5 md:text-xl ">Date</th>
                <th className="py-6  md:text-xl ">Time</th>
                <th className="py-6  md:text-xl ">Status</th>
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
                          <button
                            className="hover:scale-105 md:pl-4"
                            onClick={() => handleReservation(item._id)}
                          >
                            <MdOutlinePendingActions className="text-orange-400 text-3xl " />
                          </button>
                        ) : (
                          <GiConfirmed className="text-green-500 text-3xl" />
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

export default ManageBookings;
