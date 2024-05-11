import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

import { format } from "date-fns";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionIntro from "../../../common/SectionIntro";
import PaymentHistoryPurchaseDetailsModal from "./PaymentHistoryPurchaseDetailsModal";
const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [totalExpense, setTotalExpense] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentHistory1"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      console.log(res.data);
      let sum = 0;
      await res.data.forEach(item => {
        sum += item.price;
      });
      setTotalExpense(sum);
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
    <>
      <div>
        <SectionIntro
          heading="Thanks for choosing us"
          text="YOUR PAYMENTS"
        ></SectionIntro>
        <div className="flex justify-between items-center w-full p-6 max-w-7xl mx-auto gap-4">
          <p className="text-lg text-center md:text-2xl lg:text-3xl">
            Total Payment : {data?.length}
          </p>
          <p className="text-lg text-center md:text-2xl lg:text-3xl">
            Total Expenses : ${totalExpense}
          </p>
        </div>
        {/* table */}
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="table">
            {/* head */}
            <thead className=" bg-red-300">
              <tr className="">
                <th className="text-white">#</th>
                <th className="py-6 text-white text-center  md:text-xl ">Email</th>
                <th className="py-6 text-white text-center md:text-xl ">Purchased List</th>
                <th className="py-6 text-white text-center md:text-xl ">Price</th>
                <th className="py-6 text-white text-center pl-5 md:text-xl ">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <>
                      <tr key={item._id}>
                        <td>
                          <div className="flex items-center gap-6">
                            <div>
                              <p className="text-lg">{index + 1}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div>
                            {item.email}
                            <br />
                          </div>
                        </td>
                        <td className="text-center ">
                          <button 
                            onClick={() => {
                              document.getElementById(item._id).showModal();
                            }}
                            className=" text-center hover:cursor-pointer"
                          >
                            See details
                          </button>
                        </td>
                        <td className="text-center">${item.price}</td>
                        <td className="text-center">
                          {format(new Date(item.date), "do MMMM, yyyy p")}
                        </td>
                      </tr>
 
                      <dialog id={item._id} className="paymentModal p-8 text-white">
                        <PaymentHistoryPurchaseDetailsModal
                          item={item}
                        ></PaymentHistoryPurchaseDetailsModal>
                        {/* we can use this form with method dialog to close the modal or use this close() function . use of close() is more standard/ */}
                        <div className="modal-action">
                          {/* <form method="dialog"> */}
                          <button
                            className="btn rounded-sm bg-red-300 text-white hover:bg-red-400 btn-sm "
                            onClick={() => {
                              document.getElementById(item._id).close();
                            }}
                          >
                            close
                          </button>
                          {/* <p>fgh</p> */}
                          {/* </form> */}
                        </div>
                      </dialog>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
