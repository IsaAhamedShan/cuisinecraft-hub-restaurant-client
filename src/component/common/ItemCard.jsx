import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";
import { AuthContext } from "../provider/AuthProvider";
const ItemCard = ({ item }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { image, name, recipe,price } = item;
  const location = useLocation();
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const successfullySaved =async () => {
    await refetch();
    toast.success("Added to cart");
  };
  const unSuccessfullySaved = () => {
    toast.error("Couldn't add to cart");
  };
  const handleAddToCart = cartItem => {
    // console.log(cartItem);
    if (!user) {
      Swal.fire({
        title: "Please Sign in to add to cart",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Sign In",
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/signin", { state: { from: location } });
        }
      });
    }
    axiosSecure
      .post("/addToCart", {
        menuId: cartItem._id,
        email: user.email,
        name: cartItem.name,
        image: cartItem.image,
        category: cartItem.category,
        price: cartItem.price,
      })
      .then(res => {
        
        console.log(res.status)
        if (res.status === 200) {
          successfullySaved();
          //refetching cart to update the cart items count in navbar
          refetch();
          console.log("saved to db");
        }
      })
      .catch(err => {
        unSuccessfullySaved();

        console.log(err);
      });
    // console.log(cartItem);
  };
  return (
    <div>
      <Toaster />
      <div className="card w-[320px] h-[432.8px] md:w-[340px] md:h-[459.85px] lg:w-[370px] lg:h-[500.42px] xl:w-[400px] xl:h-[541px] shadow-xl rounded-sm hover:scale-105 duration-200 cursor-pointer bg-yellow-100 ">
        <figure>
          <img
            src={image}
            alt="image"
            className="rounded-none w-full h-full relative"
          />
          <div className="badge rounded-[4px] bg-yellow-300 border-none absolute top-5 right-5"><p className="py-4">{price}$</p></div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-semibold font-raleway">
            {name}
          </h2>
          <p className="text-normal font-roboto">{recipe}</p>
          <div className="card-actions">
            <button
              className="btn btn-wide rounded-md text-[#BB8506]  text-2xl  bg-yellow-200 hover:bg-[#1F2937] border-b-4 border-x-0 border-t-0 border-yellow-700 hover:border-gray-500"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
