import { RiDeleteBin6Line } from "react-icons/ri";
import useMenu from "../../../Hooks/useMenu";
import SectionIntro from "../../../common/SectionIntro";

const ManageItem = () => {
  const [data,isLoading,fetch] = useMenu();
  console.log("menu ",data);
  return <div>
    <SectionIntro heading="Hurry Up" text="MANAGE ALL ITEMS"></SectionIntro>

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
                <th className="py-6  md:text-xl ">Action</th>
                <th className="py-6  md:text-xl ">Action</th>
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
                        <img src={item.image} className="size-12 rounded-lg" alt="" />
                      </td>
                      <td>
                        $ {item.price}
                      </td>
                      <th>
                        <button
                          className="btn"
                          
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
  </div>;
};

export default ManageItem;
