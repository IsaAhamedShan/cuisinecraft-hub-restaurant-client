import { CiViewTable } from "react-icons/ci";
import SectionIntro from "../../../common/SectionIntro";
import { useForm } from "react-hook-form";
import ContactForm from "../../ContactUs/ContactForm";
import ContactInfo from "../../ContactUs/ContactInfo";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
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
      <form onSubmit={handleSubmit(onSubmit)} className=" md:m-8">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex justify-center items-center flex-col gap-4 md:gap-20">
          <div className="flex flex-wrap justify-center items-center md:gap-14">
            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                className="input input-bordered w-full max-w-xs rounded-sm"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-4 rounded-sm">
              <div className="label">
                <span className="label-text">Mobile</span>
              </div>
              <input
                className="input input-bordered w-full max-w-xs"
                placeholder="01xxxxxxxxx"
                {...register("phone")}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Email (To send status)</span>
              </div>
              <input
                className="input input-bordered w-full max-w-xs rounded-sm"
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
                className="input input-bordered w-full max-w-xs rounded-sm"
                type="date"
                {...register("date", { required: true })}
              />
            </label>

            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Time</span>
              </div>
              <input
                className="input input-bordered w-full max-w-xs rounded-sm"
                type="time"
                {...register("time", { required: true })}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-4">
              <div className="label">
                <span className="label-text">Guest</span>
              </div>
              <select
                className="select select-bordered rounded-sm"
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
            className="btn btn-wide rounded-sm bg-blue-300 hover:bg-blue-400 text-white"
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
