import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { CiViewTable } from "react-icons/ci";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionIntro from "../../../common/SectionIntro";
import { AuthContext } from "../../../provider/AuthProvider";
import ContactInfo from "../../ContactUs/ContactInfo";
const Reservation = () => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();
  const axios = useAxiosSecure();
  const {user} = useContext(AuthContext)

  const onSubmit = reservationData => {
    console.log(reservationData);
    reservationData.status = "pending";
    reservationData.userEmail = user?.email;
    axios
      .post("/reservation", {
        reservationData,
      })
      .then(res => {
        if (res.status === 200) {
          toast.success("Reservation Request Success");
          reset()
        }
        // console.log(res)
      })
      .catch(err => {
        // console.log(err)
        toast.err(`Something is wrong.
        Try Again`);

      });
  };
  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <SectionIntro
        heading={"Reservation"}
        text={"BOOK A TABLE"}
      ></SectionIntro>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className=" p-8 md:m-8 rounded-lg border-none bg-[#CAF4FF]">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex justify-center items-center flex-col gap-4 md:gap-20">
          <div className="flex flex-wrap justify-center items-center md:gap-14">
            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                className="input  w-full max-w-xs rounded-sm"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-4 ">
              <div className="label">
                <span className="label-text">Mobile</span>
              </div>
              <input
                className="input  w-full max-w-xs rounded-sm"
                placeholder="01xxxxxxxxx"
                {...register("phone")}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Email (To send status)</span>
              </div>
              <input
                className="input  w-full max-w-xs rounded-sm"
                type="email"
                placeholder="Example@gmail.com"
                {...register("email")}
              />
            </label>

            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Date</span>
              </div>
              <input
                className="input  w-full max-w-xs rounded-sm"
                type="date"
                {...register("date", { required: true })}
              />
            </label>

            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Time</span>
              </div>
              <input
                className="input  w-full max-w-xs rounded-sm"
                type="time"
                {...register("time", { required: true })}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Guest</span>
              </div>
              <select
                className="select  rounded-sm"
                {...register("guest", { required: true })}
              >
                <option disabled selected>
                  Number of Guest
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </label>
          </div>
          <button
            className="btn btn-wide rounded-sm bg-[#A0DEFF] hover:bg-[#FFF9D0] hover:text-black border-none hover:border-2 hover:border-grey-900 text-white"
            type="submit"
          >
            Book a Table
            <CiViewTable />
          </button>
        </div>
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
      </form>
      <ContactInfo></ContactInfo>
    </div>
  );
};

export default Reservation;
