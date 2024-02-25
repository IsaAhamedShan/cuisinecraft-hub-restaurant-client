import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionIntro from "../../../common/SectionIntro";

const UpdateItem = () => {
  const location = useLocation();
  const {
    state: { itemData },
  } = location;
  const item = location.state;
  // console.log("🚀 ~ UpdateItem ~ item:", item)
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
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
    const image = { image: data.imageFile[0] };
    const res = await axiosPublic.post(image_hosting_api, image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    data.image = res.data.data.display_url;
    console.log(data);
    axiosSecure
      .patch(`/updateItem/${item._id}`, data)
      .then(res => {
        console.log(res);
        if (res.data.modifiedCount) {
          success();
        }
      })
      .catch(error => {
        console.log(error);
        unsuccess();
      });
  };
  return (
    <div>
      <SectionIntro
        heading="WHAT'S CHANGED"
        text="UPDATE AN ITEM"
      ></SectionIntro>
      <div className="max-w-5xl m-auto my-8 px-2 md:px-4 xl:px-0">
        <Toaster position="top-right" reverseOrder={false}></Toaster>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 bg-slate-300 rounded-md"
        >
          <label className="form-control  w-full">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            </div>
            <input
              defaultValue={item.name}
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
                className="select select-bordered w-full"
                defaultValue={item.category}
                {...register("category", { required: true })}
              >
                <option disabled value="default">
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
                defaultValue={item.price}
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
              defaultValue={item.recipe}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
            ></textarea>
          </label>
          <div className="flex justify-between">
            <input
              type="file"
              defaultValue=""
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

export default UpdateItem;
