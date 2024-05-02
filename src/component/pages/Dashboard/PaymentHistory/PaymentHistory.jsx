import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

import { format } from "date-fns";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentHistory1"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div>
        <p className="text-3xl">Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center w-full p-6 max-w-7xl mx-auto">
        <p className="text-lg md:text-2xl lg:text-3xl">
          Total Payment : {data?.length}
        </p>
      </div>
      {/* table */}
      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead className=" bg-red-300">
            <tr className="">
              <th className="">#</th>
              <th className="py-6  md:text-xl ">Email</th>
              {/* <th className="py-6  md:text-xl ">Items</th> */}
              <th className="py-6  md:text-xl ">Price</th>
              <th className="py-6 pl-5 md:text-xl ">Payment Date</th>
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
                        {item.email}
                        <br />
                      </div>
                    </td>
                    {/* <td className="px-0 md:px-4">{
                     
              }</td> */}
                    <td>${item.price}</td>
                    <td>{format(new Date(item.date), "do MMMM, yyyy p")}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
