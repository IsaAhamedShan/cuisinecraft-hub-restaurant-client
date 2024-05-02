import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionIntro from "../../../common/SectionIntro";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
const AddItems = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const image_hosting_key =  import.meta.env.VITE_IMAGE_HOSTING_KEY
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const success = ()=> toast.success("Item added Successfully")
const unsuccess = ()=> toast.error("Couldn't add item")
  const onSubmit = async data => {
    console.log(data)
    const image = {image: data.imageFile[0]}
    const res = await axiosPublic.post(image_hosting_api,image, {
        headers:{
            'content-type': 'multipart/form-data'
        }
    })
    data.image = res.data.data.display_url
    console.log(data)
    axiosSecure
      .post("/addItem", data)
      .then(res => {
        console.log(res);
        if(res.data.insertedId){
            success()
        }
      })
      .catch(error => {
        console.log(error);
        unsuccess()
      });
  };

  return (
    <div>
        <Toaster   position="top-right"
  reverseOrder={false}></Toaster>
      <SectionIntro heading="WHAT'S NEW" text="ADD AN ITEM"></SectionIntro>
      <div className="max-w-5xl m-auto my-8 px-2 md:px-4 xl:px-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 bg-red-300 rounded-md"
        >
          <label className="form-control  w-full">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            </div>
            <input
              defaultValue=""
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-8 my-8">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                className="select select-bordered w-full" defaultValue='default'
                {...register("category", { required: true })}
              >
                <option disabled value='default'>
                  Select Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price *</span>
              </div>
              <input
                defaultValue=""
                {...register("price", { required: true })}
                type="text"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <label className="form-control w-full my-8">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              type="text"
              className="textarea textarea-bordered h-24"
              placeholder="Details"
            ></textarea>
          </label>
          <div className="flex justify-between">
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("imageFile", { required: true })}
            />
            {/* {errors.name && errors.details && errors.price && <span>All field are required</span>} */}
            <button type="submit" className="btn btn-outline">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
