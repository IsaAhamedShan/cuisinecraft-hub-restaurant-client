import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import SectionIntro from "../../common/SectionIntro";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const success = () => toast.success("Item Updated Successfully");
  const unsuccess = () => toast.error("Couldn't update item");
  const onSubmit = async data => {
    console.log(data);
  };

  return (
    <div>
      <SectionIntro
        heading="Send Us a Message"
        text="CONTACT FORM"
      ></SectionIntro>
      <div className="max-w-5xl m-auto my-8 px-2 md:px-4 xl:px-0">
        <Toaster position="top-right" reverseOrder={false}></Toaster>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 bg-slate-300 rounded-md"
        >
          <label className="form-control  w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name here"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-8 my-8">
          <label className="form-control  w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="example@gmail.com"
              className="input input-bordered w-full"
            />
          </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Phone</span>
              </div>
              <input
                {...register("phone", { required: true })}
                type="text"
                placeholder="Enter your phone number here"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <label className="form-control w-full my-8">
            <div className="label">
              <span className="label-text">Message</span>
            </div>
            <textarea
              {...register("message", { required: true })}
              type="text"
              className="textarea textarea-bordered h-24"
              placeholder="Write your message here..."
            ></textarea>
          </label>
          <div className="flex justify-between">
            
            {/* {errors.name && errors.details && errors.price && <span>All field are required</span>} */}
            <button type="submit" className="btn btn-outline">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
