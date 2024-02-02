import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCart from "../../../Hooks/useCart";
import SectionIntro from "../../../common/SectionIntro";
import { AuthContext } from "../../../provider/AuthProvider";

const Mycart = () => {
  const [cart] = useCart();
  console.log("cart is:", cart);
  const totalValue = cart.reduce((accumulator, item) => {
    return (accumulator += parseInt(item.price));
  }, 0);
  console.log("ttotal value :", totalValue);
  const { user } = useContext(AuthContext);

  return (
    <div>
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
          <button className="btn btn-outline">Pay</button>
        </div>
        {/* table */}
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="table">
            {/* head */}
            <thead className=" bg-red-300">
              <tr className="">
                {/* <th className=""></th> */}
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
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              className=""
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.name}
                      <br />
                      <span className="badge badge-ghost badge-sm rounded-md bg-red-300 py-2">
                        {item.category}
                      </span>
                    </td>
                    <td>{item.price} $</td>
                    <th>
                      <RiDeleteBin6Line className=" hover:scale-105 duration-150 hover:bg-slate-200 rounded-md cursor-pointer md:text-xl xl:text-2xl" />
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
