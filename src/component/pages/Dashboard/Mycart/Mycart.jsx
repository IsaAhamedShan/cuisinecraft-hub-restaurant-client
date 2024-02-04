import { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import SectionIntro from "../../../common/SectionIntro";
import { AuthContext } from "../../../provider/AuthProvider";
const Mycart = () => {
  const [cart, refetch] = useCart();
  console.log("cart is:", cart);
  const axiosSecure = useAxiosSecure();
  const deleteSuccess = () => toast.success("Item Deleted successfully");
  const totalValue = cart.reduce((accumulator, item) => {
    return (accumulator += parseInt(item.price));
  }, 0);
  console.log("🚀 ~ totalValue ~ totalValue:", totalValue);

  const { user } = useContext(AuthContext);
  const handleDeleteItem = _id => {
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
          .delete(`/deleteCartItem/${_id}`)
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

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <SectionIntro
        heading="My Cart"
        text="WANNA ADD MORE?"
        textColor="text-black"
      ></SectionIntro>
      {/* {cart && <p>usercart length : {cart.length}</p>} */}
      <div>
        <div className="flex justify-between items-center w-full p-6 max-w-7xl mx-auto">
          <p className="text-lg md:text-2xl lg:text-3xl">
            Total Order: {cart && cart.length}
          </p>
          <p className="text-lg md:text-2xl lg:text-3xl">
            Total Price: {totalValue && totalValue} $
          </p>
          <button className="btn btn-outline bg-red-300 hover:bg-red-400 border-none px-6">
            <p className="text-lg">Pay</p>
          </button>
        </div>
        {/* table */}
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="table">
            {/* head */}
            <thead className=" bg-red-300">
              <tr className="">
                <th className="">#</th>
                <th className="py-6  md:text-xl ">Item Image</th>
                <th className="py-6  md:text-xl ">Item Name</th>
                <th className="py-6  md:text-xl ">Price</th>
                <th className="py-6  md:text-xl ">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-lg">{index + 1}</p>
                        </div>
                      </div>
                    </td>

                    <td className="">
                      <div className="avatar">
                        <div className="mask rounded-md w-12 h-12 ">
                          <img
                            className=""
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {item.name}
                        <br />
                        <span className="badge badge-ghost badge-sm rounded-md bg-red-300 py-2">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td>{item.price} $</td>
                    <th>
                      <button
                        className="btn"
                        onClick={() => {
                          handleDeleteItem(item._id);
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

export default Mycart;
