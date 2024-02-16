import { RiDeleteBin6Line } from "react-icons/ri";
import useMenu from "../../../Hooks/useMenu";

import { Toaster, toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionIntro from "../../../common/SectionIntro";
const ManageItem = () => {
  const [data, isLoading, refetch] = useMenu();
  const success = () => toast.success("deleted Successfully");
  const unsuccess = () => toast.error("error while deleting");
  const axiosSecure = useAxiosSecure();
  console.log("menu ", data);
  const navigate = useNavigate();
  const handleUpdate = item => {
    console.log(item);
    navigate(`/dashboard/updateItem/${item._id}`, { state: item });
    
  };
  const deleteItem = id => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deleteItem/${id}`)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              success();
              refetch();
            }
          })
          .catch(err => {
            console.log(err);
            unsuccess();
          });
      }
    });
  };
  return (
    <div>
      <SectionIntro heading="Hurry Up" text="MANAGE ALL ITEMS"></SectionIntro>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div>
        <div className="flex justify-between items-center w-full p-6 max-w-7xl mx-auto">
          <p className="text-lg md:text-2xl lg:text-3xl">
            Total Items: {data && data.length}
          </p>
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
                <th className="py-6 pl-5 md:text-xl ">Price</th>
                <th className="py-6  md:text-xl ">Update</th>
                <th className="py-6  md:text-xl ">Delete</th>
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
                            <p className="text-lg">{index + 1}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div>
                          {item.name}
                          <br />
                        </div>
                      </td>
                      <td className="px-0  md:px-4 ">
                        <img
                          src={item.image}
                          className="size-12 rounded-lg"
                          alt=""
                        />
                      </td>
                      <td>$ {item.price}</td>
                      <th>
                        <button
                          className="btn"
                          onClick={() => handleUpdate(item)}
                        >
                          <FaRegEdit className=" text-red-600 hover:scale-105 duration-150  rounded-md cursor-pointer md:text-xl xl:text-2xl" />
                        </button>
                      </th>
                      <th>
                        <button className="btn">
                          <RiDeleteBin6Line
                            onClick={() => deleteItem(item._id)}
                            className=" text-red-600 hover:scale-105 duration-150  rounded-md cursor-pointer md:text-xl xl:text-2xl"
                          />
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

export default ManageItem;
